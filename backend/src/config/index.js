module.exports = {
  JWT_SECRET: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: '7d', // or shorter, e.g. '1h' + refresh tokens
  COOKIE_NAME: 'token',
  GOOGLE_CLIENT_ID: process.env.OAUTH_GOOGLE_CLIENT_ID,
};
