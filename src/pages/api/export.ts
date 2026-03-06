import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

initializeApp({
  credential: {
    /* Your firebase credential setup */
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage();

const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 min
const MAX_REQUESTS_PER_WINDOW = 5;

const exportData = async (req: AuthedRequest, res: NextApiResponse) => {
  try {
    const now = Date.now();
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const lastRequestTime = rateLimit.get(userId) || 0;
    const requestCount = rateLimit.get(`${userId}-${lastRequestTime}`) || 0;

    if (now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
      if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({ error: 'Too many requests' });
      }
      rateLimit.set(`${userId}-${lastRequestTime}`, requestCount + 1);
    } else {
      rateLimit.set(userId, now);
      rateLimit.set(`${userId}-${now}`, 1);
    }

    // Mock data export logic
    const exportData = {
      // Simulate data structure
      timestamp: new Date().toISOString(),
      data: [
        { id: 1, name: 'Example 1' },
        { id: 2, name: 'Example 2' },
      ],
    };

    const fileName = `export-${uuidv4()}.json`;
    const file = bucket.file(fileName);
    
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'application/json',
      },
    });

    stream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    });

    stream.on('finish', () => {
      res.status(200).json({ message: 'Export successful', fileName });
    });

    stream.end(JSON.stringify(exportData));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
};

export default exportData;