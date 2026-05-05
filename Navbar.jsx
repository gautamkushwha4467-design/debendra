import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { run, get, all, initializeDatabase } from './db.js';
import { authMiddleware, signToken } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.redirect('http://localhost:5173');
  });
}

await initializeDatabase();

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existingUser = await get('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists.' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = await run('INSERT INTO users (name, email, passwordHash, createdAt) VALUES (?, ?, ?, ?)', [
    name,
    email,
    passwordHash,
    new Date().toISOString()
  ]);

  const user = { id: result.lastID, name, email };
  const token = signToken({ id: user.id });
  res.json({ token, user });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = await get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const passwordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordValid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = signToken({ id: user.id });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, education: user.education, interests: user.interests ? JSON.parse(user.interests) : [], skills: user.skills ? JSON.parse(user.skills) : [] } });
});

app.get('/api/profile', authMiddleware, async (req, res) => {
  const user = await get('SELECT id, name, email, education, interests, skills FROM users WHERE id = ?', [req.user.id]);
  if (!user) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  res.json({
    user: {
      ...user,
      interests: user.interests ? JSON.parse(user.interests) : [],
      skills: user.skills ? JSON.parse(user.skills) : []
    }
  });
});

app.post('/api/onboarding', authMiddleware, async (req, res) => {
  const { education, interests, skills } = req.body;
  if (!education || !Array.isArray(interests) || !Array.isArray(skills)) {
    return res.status(400).json({ error: 'Please provide education, interests, and skills.' });
  }

  await run('UPDATE users SET education = ?, interests = ?, skills = ? WHERE id = ?', [
    education,
    JSON.stringify(interests),
    JSON.stringify(skills),
    req.user.id
  ]);

  res.json({ success: true });
});

app.get('/api/careers', async (req, res) => {
  const careers = await all('SELECT id, title, matchPercent as match, description FROM careers');
  res.json({ careers });
});

app.get('/api/careers/:id', async (req, res) => {
  const career = await get('SELECT * FROM careers WHERE id = ?', [req.params.id]);
  if (!career) {
    return res.status(404).json({ error: 'Career not found.' });
  }

  res.json({ career });
});

app.post('/api/chat', authMiddleware, (req, res) => {
  const { message } = req.body;
  res.json({
    answer: message
      ? `AI says: ${message} is a great topic—let's explore it in your career plan.`
      : 'Hi! Ask anything about your career and I will help.'
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
