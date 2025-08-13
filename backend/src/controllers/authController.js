const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { OAuth2Client } = require('google-auth-library');
const { signUser } = require('../utils/jwt');
const { COOKIE_NAME } = require('../config');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const { createResetPasswordToken, verifyResetPasswordToken, resetPassword, sendEmail } = require('../utils/reset_password.js');

const prisma = new PrismaClient();
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  FRONTEND_URL,
} = process.env;

const SALT_ROUNDS = 10;

// Register a new user
async function register(req, res) {
  try{
  const { name, email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword)
    return res.status(400).json({ error: "Email and password required" });

  if (password !== confirmPassword)
    return res.status(400).json({ error: "Passwords do not match" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return res.status(409).json({ error: "Email already registered" });

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { name, email, passwordHash: hash, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  });

  const token = signUser(user);
  // send HttpOnly cookie
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 3600 * 1000,
  });
  res.json({ user });
}catch(error){
  console.error("Registration failed:", error);
  res.status(500).json({ error: "Internal server error" });
}
}

// Login an existing user
async function login(req, res) {
  try{
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash)
    return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signUser(user);
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 3600 * 1000,
  });
  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token,
  });
}catch(error){
  console.error("Login failed:", error);
  res.status(500).json({ error: "Internal server error" });
}
}

// Logout user by clearing cookie
async function logout(req, res) {
  try{
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
  }catch(error){
  console.error("Logout failed:", error);
  res.status(500).json({ error: "Internal server error" });
}
}

// Google OAuth id_token flow

// Start Google OAuth - redirect user to Google consent screen
async function googleOAuth(req, res) {
  try{
  const params = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: ["openid", "email", "profile"].join(" "),
    access_type: "offline",
    prompt: "consent", // force refresh token; remove if not needed
  };

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
    params
  )}`;
  console.log(params);
  console.log(url);
  res.redirect(url);
  }catch(error){
  console.error("Google OAuth error:", error);
  res.status(500).json({ error: "Internal server error" });
}
}

// Google callback - exchange code for tokens, get profile, upsert user, issue JWT

async function googleOAuthCallback(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "No Code provided" });

  try {
    // Exchange code for tokens
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: querystring.stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResp.ok) {
      const error = await tokenResp.json();
      return res
        .status(400)
        .json({ error: "Failed to exchange code for tokens", details: error });
    }

    const { access_token, id_token } = await tokenResp.json();

    // User id_token or access_token to get user profile. We'll use Google's userinfo endpoint.
    const profileResp = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    if (!profileResp.ok) {
      const error = await profileResp.json();
      return res
        .status(400)
        .json({ error: "Failed to fetch user profile", details: error });
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
        oauthProvider: "google",
        oauthId,
      },
      create: {
        email,
        name,
        oauthProvider: "google",
        oauthId,
        role: "USER", // Default role, can be changed later
      },
    });

    // Create JWT token for user
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set cookie with JWT
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax",
      maxAge: 7 * 24 * 3600 * 1000, // 5 days
    });

    // Redirect to frontend with user data(client reads cookie automatically on same domain or wit proper CORS setup)
    return res.redirect(`${FRONTEND_URL}/product?token=${token}`);
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}



async function me(req, res) {
  try{
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { addresses: true },
  });
  res.json({ user });
}catch(error){
  console.error("Error fetching user data:", error);
  res.status(500).json({ error: "Internal server error" });
}
}



// Request password reset - generate token and send email
async function requestResetPassword(req, res) {
   try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = await createResetPasswordToken(user.id);


    // Create reset URL
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

    // Email Message
    const message = `
      <p>You requested a password reset for your account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `


    // Send the email
    await sendEmail(user.email, 'Password Reset Request', message);


    

    // Here you would send the token to the user's email
    // For simplicity, we'll just return it in the response
    // In production, you should send this token in an email with a link to reset password

    // Example: sendEmail(user.email, `Reset your password: ${FRONTEND_URL}/reset-password?token=${token}`);

     // For now, just return the token in the response


    res.json({ message: 'Reset password email sent' });
   } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ error: 'Internal server error' });
   }
}

// Reset password using token
async function resetPasswordByEmail(req, res) {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    if (error.message === 'Invalid token' || error.message === 'Token already used' || error.message === 'Token expired') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}




module.exports = { register, login, logout, googleOAuth, googleOAuthCallback, me, requestResetPassword, resetPasswordByEmail };
