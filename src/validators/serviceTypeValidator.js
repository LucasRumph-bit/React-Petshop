const { body, param } = require('express-validator');

const serviceTypeIdParamValidator = [param('id').isInt({ gt: 0 }).withMessage('ID invalido.')];

const createServiceTypeValidator = [
  body('name').trim().notEmpty().withMessage('Nome e obrigatorio.'),
  body('description').optional().isString().withMessage('Descricao invalida.'),
  body('basePrice').isFloat({ gt: 0 }).withMessage('Preco base invalido.'),
];

const updateServiceTypeValidator = [
  ...serviceTypeIdParamValidator,
  body('name').optional().trim().notEmpty().withMessage('Nome nao pode ser vazio.'),
  body('description').optional().isString().withMessage('Descricao invalida.'),
  body('basePrice').optional().isFloat({ gt: 0 }).withMessage('Preco base invalido.'),
];

module.exports = {
  serviceTypeIdParamValidator,
  createServiceTypeValidator,
  updateServiceTypeValidator,
};
