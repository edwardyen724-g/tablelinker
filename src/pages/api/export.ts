import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY as string);

if (!admin.apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 1, // per 1 second
});

interface AuthedRequest extends NextApiRequest {
  userId?: string;
}

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await rateLimiter.consume(req.ip);
    const { tables } = req.body;

    if (!tables || !Array.isArray(tables)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const data = await Promise.all(
      tables.map(async (table) => {
        const snapshot = await db.collection(table).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      })
    );

    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: String(err) });
    }
  }
}