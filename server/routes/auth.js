import { Router } from 'express';

const router = Router();

// In-memory user store: Map<id, user>
const users = new Map();
let nextId = 1;

// Register with name/email/password (simple demo auth)
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required' });
  if (password.length < 4) return res.status(400).json({ error: 'Password must be at least 4 characters' });

  for (const u of users.values()) {
    if (u.email === email) return res.status(409).json({ error: 'Email already registered' });
  }

  const user = { id: nextId++, name, email, password };
  users.set(user.id, user);

  const { password: _, ...safe } = user;
  res.json({ user: safe, token: String(user.id) });
});

// Login with email/password
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  for (const u of users.values()) {
    if (u.email === email && u.password === password) {
      const { password: _, ...safe } = u;
      return res.json({ user: safe, token: String(u.id) });
    }
  }
  res.status(401).json({ error: 'Invalid email or password' });
});

// Google OAuth — receive credential from Google Identity Services
router.post('/google', (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: 'Missing credential' });

  // Decode the JWT payload (demo — in production, verify signature with Google's public keys)
  try {
    const payload = JSON.parse(Buffer.from(credential.split('.')[1], 'base64').toString());
    const { sub, name, email, picture } = payload;

    // Find or create user by Google sub ID
    let user = null;
    for (const u of users.values()) {
      if (u.googleId === sub || u.email === email) { user = u; break; }
    }

    if (!user) {
      user = { id: nextId++, name, email, googleId: sub, picture };
      users.set(user.id, user);
    }

    const { password: _, ...safe } = user;
    res.json({ user: safe, token: String(user.id) });
  } catch {
    res.status(400).json({ error: 'Invalid Google credential' });
  }
});

// Get current user from token
router.get('/me', (req, res) => {
  const token = req.headers['x-user-id'];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  const user = users.get(Number(token));
  if (!user) return res.status(401).json({ error: 'User not found' });

  const { password: _, ...safe } = user;
  res.json(safe);
});

export default router;
