import type { NextApiRequest, NextApiResponse } from 'next';
import { admin } from 'lib/firebase-admin'; // Assuming you have a firebase-admin setup in lib/
import { verify } from 'lib/auth'; // Assuming you have auth verification setup
import { Relationship } from 'types/relationships'; // Define your Relationship type as needed

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const relationshipsMap = new Map<string, number>(); // Simple in-memory Map for rate limiting

export default async function createRelationship(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = await verify(req); // Assuming verify returns user ID

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const rateLimitKey = userId;
  const currentCount = relationshipsMap.get(rateLimitKey) || 0;

  if (currentCount >= 5) { // Limit to 5 requests per user
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  relationshipsMap.set(rateLimitKey, currentCount + 1);

  try {
    const { tableAId, tableBId, relationshipType }: Relationship = req.body;

    if (!tableAId || !tableBId || !relationshipType) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Logic to create a relationship in your database
    const relationshipRef = admin.firestore().collection('relationships').doc();
    await relationshipRef.set({
      userId,
      tableAId,
      tableBId,
      relationshipType,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(201).json({ id: relationshipRef.id, message: 'Relationship created successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  } finally {
    // Cleanup rate limit entry after a certain period if necessary, implement your logic
    setTimeout(() => {
      const updatedCount = relationshipsMap.get(rateLimitKey) || 0;
      if (updatedCount > 0) {
        relationshipsMap.set(rateLimitKey, updatedCount - 1);
      }
    }, 60000); // Resetting every minute
  }
}