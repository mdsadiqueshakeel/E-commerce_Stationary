const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { OAuth2Client } = require('google-auth-library');
const { signUser } = require('../utils/jwt');
const { COOKIE_NAME } = require('../config');
const querystring = require('querystring');

const prisma = new PrismaClient();
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  FRONTEND_URL
} = process.env;


const SALT_ROUNDS = 10;

// Register a new user
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


// Login an existing user
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


// Logout user by clearing cookie
async function logout(req, res) {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
}


// Google OAuth id_token flow

 // Start Google OAuth - redirect user to Google consent screen
async function googleOAuth(req, res) {
  const params = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
     scope: [
      'openid',
      'email',
      'profile'
    ].join(' '),
    access_type: 'offline',
    prompt: 'consent' // force refresh token; remove if not needed
  }
  
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(params)}`;
  console.log(params);
console.log(url);
  res.redirect(url);
}


// Google callback - exchange code for tokens, get profile, upsert user, issue JWT

async function googleOAuthCallback(req, res) {
  const { code } = req.query;
  if(!code) return 
res.status(400).json({ error: 'No Code provider' });

  try {
    // Exchange code for tokens
    const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: querystring.stringify({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    }), });

    if (!tokenResp.ok) {
      const error = await tokenResp.json();
      return res.status(400).json({ error: 'Failed to exchange code for tokens', details: error });
    }

    const { access_token, id_token } = await tokenResp.json();

    // User id_token or access_token to get user profile. We'll use Google's userinfo endpoint.
    const profileResp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    if (!profileResp.ok) {
      const error = await profileResp.json();
      return res.status(400).json({ error: 'Failed to fetch user profile', details: error });
    }

    const profile = await profileResp.json();

    const email = profile.email;
    const name = profile.name;
    const oauthId = profile.sub; // Google user ID
    const picture = profile.picture; // Optional: user profile picture

    // Upsert user in database
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        oauthProvider: 'google',
        oauthId,
        picture
      },
      create: {
        email,
        name,
        oauthProvider: 'google',
        oauthId,
        picture,
        role: 'USER' // Default role, can be changed later
      },
    });


  // Create JWT token for user
  const token = jwt.sign( { id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

  // Set cookie with JWT
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'lax',
    maxAge: 5 * 24 * 3600 * 1000 // 5 days
  });

  // Redirect to frontend with user data(client reads cookie automatically on same domain or wit proper CORS setup)
  res.redirect(`${FRONTEND_URL}/oauth/success`);
} catch (error) {
    console.error('Google OAuth callback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



  // const ticket = await googleClient.verifyIdToken({
  //   idToken,
  //   audience: process.env.OAUTH_GOOGLE_CLIENT_ID,
  // });

  // const payload = ticket.getPayload();
  // const email = payload.email;
  // const name = payload.name;
  // const oauthId = payload.sub;


  // Upsert user
  // let user = await prisma.user.findUnique({ where: { email } });
  // if (!user) {
  //   user = await prisma.user.create({
  //     data: {
  //       email,
  //       name,
  //       oauthProvider: 'google',
  //       oauthId,
  //     },
  //     select: { id: true, email: true, name: true, role: true }
  //   });
  // } else {
  //   // ensure oauth fields set if missing
  //   await prisma.user.update({
  //     where: { id: user.id },
  //     data: { oauthProvider: 'google', oauthId },
  //   });
  // }

  // const token = signUser(user);
  // res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
  // res.json({ user });


async function me(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { addresses: true }
  });
  res.json({ user });
}

module.exports = { register, login, logout, googleOAuth, googleOAuthCallback, me };
