const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function getTokenFromReq(req) {
  const bearer = req.headers.authorization?.split(' ')[1];
  return req.cookies?.token || bearer;
}

function authMiddleware(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function adminOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  return next();
}

module.exports = { authMiddleware, adminOnly };
