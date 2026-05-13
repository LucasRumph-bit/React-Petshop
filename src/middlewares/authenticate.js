const ApiError = require('../utils/ApiError');
const { verifyAccessToken } = require('../utils/jwt');
const { User } = require('../models');

const authenticate = async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Token de acesso nao informado.'));
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = verifyAccessToken(token);
    const user = await User.findByPk(payload.sub, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      return next(new ApiError(401, 'Usuario do token nao encontrado.'));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError(401, 'Token invalido ou expirado.'));
  }
};

module.exports = authenticate;
