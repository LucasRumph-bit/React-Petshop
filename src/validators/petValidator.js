const { body, param } = require('express-validator');

const petIdParamValidator = [param('id').isInt({ gt: 0 }).withMessage('ID invalido.')];

const createPetValidator = [
  body('name').trim().notEmpty().withMessage('Nome e obrigatorio.'),
  body('species').trim().notEmpty().withMessage('Especie e obrigatoria.'),
  body('breed').trim().notEmpty().withMessage('Raca e obrigatoria.'),
  body('size').isIn(['small', 'medium', 'large']).withMessage('Porte invalido.'),
  body('age').isInt({ min: 0 }).withMessage('Idade invalida.'),
  body('weight').isFloat({ gt: 0 }).withMessage('Peso invalido.'),
  body('notes').optional().isString().withMessage('Observacoes invalidas.'),
  body('ownerId').isInt({ gt: 0 }).withMessage('ownerId invalido.'),
];

const updatePetValidator = [
  ...petIdParamValidator,
  body('name').optional().trim().notEmpty().withMessage('Nome nao pode ser vazio.'),
  body('species').optional().trim().notEmpty().withMessage('Especie nao pode ser vazia.'),
  body('breed').optional().trim().notEmpty().withMessage('Raca nao pode ser vazia.'),
  body('size').optional().isIn(['small', 'medium', 'large']).withMessage('Porte invalido.'),
  body('age').optional().isInt({ min: 0 }).withMessage('Idade invalida.'),
  body('weight').optional().isFloat({ gt: 0 }).withMessage('Peso invalido.'),
  body('notes').optional().isString().withMessage('Observacoes invalidas.'),
  body('ownerId').optional().isInt({ gt: 0 }).withMessage('ownerId invalido.'),
];

module.exports = {
  petIdParamValidator,
  createPetValidator,
  updatePetValidator,
};
