import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const rateLimit = new Map<string, number>();
const RATE_LIMIT_THRESHOLD = 5; // Max signup attempts
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const currentTime = Date.now();
  const lastAttempt = rateLimit.get(email) || 0;
  
  if (currentTime - lastAttempt < RATE_LIMIT_WINDOW) {
    rateLimit.set(email, lastAttempt + 1);
    return res.status(429).json({ message: 'Too many signup attempts. Please try again later.' });
  }

  try {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}