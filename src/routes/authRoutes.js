const express = require('express');
const authController = require('../controllers/AuthController');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const authenticate = require('../middlewares/authenticate');
const { registerValidator, loginValidator } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', registerValidator, validateRequest, asyncHandler(authController.register.bind(authController)));
router.post('/login', loginValidator, validateRequest, asyncHandler(authController.login.bind(authController)));
router.get('/me', authenticate, asyncHandler(authController.me.bind(authController)));

module.exports = router;
