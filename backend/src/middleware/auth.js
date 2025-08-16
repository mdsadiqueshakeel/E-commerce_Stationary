const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function getTokenFromReq(req) {
  const bearer = req.headers.authorization?.split(' ')[1];
  return req.cookies?.token || bearer;
}

// function authMiddleware(req, res, next) {
//   const token = getTokenFromReq(req);
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });
//   try {
//     const payload = jwt.verify(token, JWT_SECRET);
//     req.user = payload;
//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// }

  // Middleware for protected routes
async function authMiddleware(req, res, next) {
  try {
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ error: 'Unauthenticated' });

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}


function adminOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  return next();
}






module.exports = { authMiddleware, adminOnly };
