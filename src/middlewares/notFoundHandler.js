const ApiError = require('../utils/ApiError');

const notFoundHandler = (req, _res, next) => {
  next(new ApiError(404, `Rota nao encontrada: ${req.method} ${req.originalUrl}`));
};

module.exports = notFoundHandler;
