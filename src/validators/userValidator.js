const { body, param } = require('express-validator');

const userIdParamValidator = [param('id').isInt({ gt: 0 }).withMessage('ID invalido.')];

const updateUserValidator = [
  ...userIdParamValidator,
  body('name').optional().trim().notEmpty().withMessage('Nome nao pode ser vazio.'),
  body('email').optional().trim().isEmail().withMessage('Email invalido.'),
  body('password').optional().isLength({ min: 6 }).withMessage('Senha deve ter ao menos 6 caracteres.'),
  body('role').optional().isIn(['admin', 'attendant']).withMessage('Role invalida.'),
];

module.exports = {
  userIdParamValidator,
  updateUserValidator,
};
