const express = require('express');
const serviceRecordController = require('../controllers/ServiceRecordController');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const { serviceRecordIdParamValidator, createServiceRecordValidator, updateServiceRecordValidator } = require('../validators/serviceRecordValidator');

const router = express.Router();

router.get('/', asyncHandler(serviceRecordController.list.bind(serviceRecordController)));
router.get('/:id', serviceRecordIdParamValidator, validateRequest, asyncHandler(serviceRecordController.getById.bind(serviceRecordController)));
router.post('/', createServiceRecordValidator, validateRequest, asyncHandler(serviceRecordController.create.bind(serviceRecordController)));
router.put('/:id', updateServiceRecordValidator, validateRequest, asyncHandler(serviceRecordController.update.bind(serviceRecordController)));
router.delete('/:id', serviceRecordIdParamValidator, validateRequest, asyncHandler(serviceRecordController.delete.bind(serviceRecordController)));

module.exports = router;
