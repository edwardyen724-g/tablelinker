import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const reportsMap = new Map<string, number>();

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  // Rate limiting logic
  const rateLimitKey = req.headers['x-api-key'] as string;
  const currentCount = reportsMap.get(rateLimitKey) || 0;

  if (currentCount >= 5) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  reportsMap.set(rateLimitKey, currentCount + 1);

  if (req.method === 'POST') {
    try {
      const { reportId, filters } = req.body;
      if (!reportId) {
        return res.status(400).json({ message: 'Report ID is required.' });
      }

      // Fetch report data from Firestore
      const reportRef = db.collection('reports').doc(reportId);
      const reportDoc = await reportRef.get();

      if (!reportDoc.exists) {
        return res.status(404).json({ message: 'Report not found.' });
      }

      const reportData = reportDoc.data();
      // Here we would add logic to process filters and generate report content
     
      // Respond with the generated report data
      res.status(200).json({ reportId, reportData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}