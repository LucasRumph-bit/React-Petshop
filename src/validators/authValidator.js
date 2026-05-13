const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('Nome e obrigatorio.'),
  body('email').trim().isEmail().withMessage('Email invalido.'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter ao menos 6 caracteres.'),
];

const loginValidator = [
  body('email').trim().isEmail().withMessage('Email invalido.'),
  body('password').notEmpty().withMessage('Senha e obrigatoria.'),
];

module.exports = {
  registerValidator,
  loginValidator,
};
