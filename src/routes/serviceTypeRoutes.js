const express = require('express');
const serviceTypeController = require('../controllers/ServiceTypeController');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const authorizeRoles = require('../middlewares/authorizeRoles');
const { serviceTypeIdParamValidator, createServiceTypeValidator, updateServiceTypeValidator } = require('../validators/serviceTypeValidator');

const router = express.Router();

router.get('/', asyncHandler(serviceTypeController.list.bind(serviceTypeController)));
router.get('/:id', serviceTypeIdParamValidator, validateRequest, asyncHandler(serviceTypeController.getById.bind(serviceTypeController)));
router.post('/', authorizeRoles('admin'), createServiceTypeValidator, validateRequest, asyncHandler(serviceTypeController.create.bind(serviceTypeController)));
router.put('/:id', authorizeRoles('admin'), updateServiceTypeValidator, validateRequest, asyncHandler(serviceTypeController.update.bind(serviceTypeController)));
router.delete('/:id', authorizeRoles('admin'), serviceTypeIdParamValidator, validateRequest, asyncHandler(serviceTypeController.delete.bind(serviceTypeController)));

module.exports = router;
