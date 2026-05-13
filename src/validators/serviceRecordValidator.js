const { body, param } = require('express-validator');

const serviceRecordIdParamValidator = [param('id').isInt({ gt: 0 }).withMessage('ID invalido.')];

const createServiceRecordValidator = [
  body('petId').isInt({ gt: 0 }).withMessage('petId invalido.'),
  body('serviceTypeId').isInt({ gt: 0 }).withMessage('serviceTypeId invalido.'),
  body('serviceDate').isISO8601().withMessage('dataServico invalida.'),
  body('chargedAmount').isFloat({ gt: 0 }).withMessage('valorCobrado invalido.'),
  body('notes').optional().isString().withMessage('Observacoes invalidas.'),
  body('status').isIn(['scheduled', 'in_progress', 'completed', 'canceled']).withMessage('Status invalido.'),
];

const updateServiceRecordValidator = [
  ...serviceRecordIdParamValidator,
  body('petId').optional().isInt({ gt: 0 }).withMessage('petId invalido.'),
  body('serviceTypeId').optional().isInt({ gt: 0 }).withMessage('serviceTypeId invalido.'),
  body('serviceDate').optional().isISO8601().withMessage('dataServico invalida.'),
  body('chargedAmount').optional().isFloat({ gt: 0 }).withMessage('valorCobrado invalido.'),
  body('notes').optional().isString().withMessage('Observacoes invalidas.'),
  body('status').optional().isIn(['scheduled', 'in_progress', 'completed', 'canceled']).withMessage('Status invalido.'),
];

module.exports = {
  serviceRecordIdParamValidator,
  createServiceRecordValidator,
  updateServiceRecordValidator,
};
