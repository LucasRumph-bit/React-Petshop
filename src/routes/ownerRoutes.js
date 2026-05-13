const express = require('express');
const ownerController = require('../controllers/OwnerController');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const { ownerIdParamValidator, createOwnerValidator, updateOwnerValidator } = require('../validators/ownerValidator');

const router = express.Router();

router.get('/', asyncHandler(ownerController.list.bind(ownerController)));
router.get('/:id', ownerIdParamValidator, validateRequest, asyncHandler(ownerController.getById.bind(ownerController)));
router.post('/', createOwnerValidator, validateRequest, asyncHandler(ownerController.create.bind(ownerController)));
router.put('/:id', updateOwnerValidator, validateRequest, asyncHandler(ownerController.update.bind(ownerController)));
router.delete('/:id', ownerIdParamValidator, validateRequest, asyncHandler(ownerController.delete.bind(ownerController)));

module.exports = router;
