const ApiError = require('../utils/ApiError');

const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Usuario nao autenticado.'));
  }

  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Usuario sem permissao para esta operacao.'));
  }

  return next();
};

module.exports = authorizeRoles;
