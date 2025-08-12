const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { OAuth2Client } = require('google-auth-library');
const { signUser } = require('../utils/jwt');
const { COOKIE_NAME } = require('../config');

const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.OAUTH_GOOGLE_CLIENT_ID);

const SALT_ROUNDS = 10;

async function register(req, res) {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { name, email, passwordHash: hash, role: 'USER' },
    select: { id: true, name: true, email: true, role: true }
  });

  const token = signUser(user);
  // send HttpOnly cookie
  res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
  res.json({ user });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signUser(user);
  res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
}

async function logout(req, res) {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
}

// Google OAuth id_token flow
async function googleOAuth(req, res) {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'idToken required' });

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.OAUTH_GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const email = payload.email;
  const name = payload.name;
  const oauthId = payload.sub;

  // Upsert user
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        oauthProvider: 'google',
        oauthId,
      },
      select: { id: true, email: true, name: true, role: true }
    });
  } else {
    // ensure oauth fields set if missing
    await prisma.user.update({
      where: { id: user.id },
      data: { oauthProvider: 'google', oauthId },
    });
  }

  const token = signUser(user);
  res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
  res.json({ user });
}

async function me(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { addresses: true }
  });
  res.json({ user });
}

module.exports = { register, login, logout, googleOAuth, me };
