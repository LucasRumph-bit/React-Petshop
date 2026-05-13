const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateAccessToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    env.auth.jwtSecret,
    {
      expiresIn: env.auth.jwtExpiresIn,
    }
  );

const verifyAccessToken = (token) => jwt.verify(token, env.auth.jwtSecret);

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
