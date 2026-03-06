import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');

if (admin.apps.length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

const relationships: Map<string, number> = new Map();

const rateLimit = (key: string) => {
  const currentTime = Date.now();
  const rateLimitWindow = 60000; // 1 minute
  const requestCount = relationships.get(key) || 0;

  if (requestCount >= 5) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  relationships.set(key, requestCount + 1);
  setTimeout(() => {
    relationships.set(key, requestCount);
  }, rateLimitWindow);
};

export default async function createRelationship(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    rateLimit(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous');

    const { tableAId, tableBId, relationshipType } = req.body;

    if (!tableAId || !tableBId || !relationshipType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newRelationship = {
      tableAId,
      tableBId,
      relationshipType,
      createdAt: admin.firestore.Timestamp.now(),
    };

    await db.collection('relationships').add(newRelationship);

    return res.status(201).json(newRelationship);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}