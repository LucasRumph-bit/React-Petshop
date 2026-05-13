const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return next(new ApiError(422, 'Dados de entrada invalidos.', errors.array()));
};

module.exports = validateRequest;
