import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

export default async function signup(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json({ user: { id: user?.id, email: user?.email } });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}