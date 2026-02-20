const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      emailVerified: user.emailVerified
    },
    env.jwtAccessSecret,
    { expiresIn: '15m' }
  );
}

function signRefreshToken(user) {
  return jwt.sign({ sub: user._id.toString(), tokenVersion: user.tokenVersion || 0 }, env.jwtRefreshSecret, {
    expiresIn: '7d'
  });
}

module.exports = { signAccessToken, signRefreshToken };
