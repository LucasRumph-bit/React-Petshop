const { param } = require('express-validator');

const cepParamValidator = [param('cep').isLength({ min: 8, max: 9 }).withMessage('CEP invalido.')];

module.exports = {
  cepParamValidator,
};
