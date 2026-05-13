const express = require('express');
const utilityController = require('../controllers/UtilityController');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const { cepParamValidator } = require('../validators/utilityValidator');

const router = express.Router();

router.get('/cep/:cep', cepParamValidator, validateRequest, asyncHandler(utilityController.lookupCep.bind(utilityController)));

module.exports = router;
