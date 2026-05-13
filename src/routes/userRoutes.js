const express = require('express');
const userController = require('../controllers/UserController');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const authorizeRoles = require('../middlewares/authorizeRoles');
const { userIdParamValidator, updateUserValidator } = require('../validators/userValidator');

const router = express.Router();

router.use(authorizeRoles('admin'));
router.get('/', asyncHandler(userController.list.bind(userController)));
router.get('/:id', userIdParamValidator, validateRequest, asyncHandler(userController.getById.bind(userController)));
router.put('/:id', updateUserValidator, validateRequest, asyncHandler(userController.update.bind(userController)));
router.delete('/:id', userIdParamValidator, validateRequest, asyncHandler(userController.delete.bind(userController)));

module.exports = router;
