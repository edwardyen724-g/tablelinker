import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: any; // Define this according to your user payload schema from Supabase
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const rateLimit = new Map<string, number>(); // Simple in-memory rate limiter

export default async function login(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const requestIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const currentCount = rateLimit.get(requestIp as string) || 0;

  if (currentCount >= 5) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  try {
    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) {
      rateLimit.set(requestIp as string, currentCount + 1);
      return res.status(401).json({ message: error.message });
    }

    rateLimit.delete(requestIp as string); // Reset rate limit on successful login

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}