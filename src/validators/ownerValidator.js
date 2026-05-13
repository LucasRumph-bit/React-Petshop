const { body, param } = require('express-validator');

const ownerIdParamValidator = [param('id').isInt({ gt: 0 }).withMessage('ID invalido.')];

const createOwnerValidator = [
  body('name').trim().notEmpty().withMessage('Nome e obrigatorio.'),
  body('document').trim().notEmpty().withMessage('Documento e obrigatorio.'),
  body('phone').trim().notEmpty().withMessage('Telefone e obrigatorio.'),
  body('email').trim().isEmail().withMessage('Email invalido.'),
  body('address').trim().notEmpty().withMessage('Endereco e obrigatorio.'),
];

const updateOwnerValidator = [
  ...ownerIdParamValidator,
  body('name').optional().trim().notEmpty().withMessage('Nome nao pode ser vazio.'),
  body('document').optional().trim().notEmpty().withMessage('Documento nao pode ser vazio.'),
  body('phone').optional().trim().notEmpty().withMessage('Telefone nao pode ser vazio.'),
  body('email').optional().trim().isEmail().withMessage('Email invalido.'),
  body('address').optional().trim().notEmpty().withMessage('Endereco nao pode ser vazio.'),
];

module.exports = {
  ownerIdParamValidator,
  createOwnerValidator,
  updateOwnerValidator,
};
