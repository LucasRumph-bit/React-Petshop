const express = require('express');
const petController = require('../controllers/PetController');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const { petIdParamValidator, createPetValidator, updatePetValidator } = require('../validators/petValidator');

const router = express.Router();

router.get('/', asyncHandler(petController.list.bind(petController)));
router.get('/:id', petIdParamValidator, validateRequest, asyncHandler(petController.getById.bind(petController)));
router.post('/', createPetValidator, validateRequest, asyncHandler(petController.create.bind(petController)));
router.put('/:id', updatePetValidator, validateRequest, asyncHandler(petController.update.bind(petController)));
router.delete('/:id', petIdParamValidator, validateRequest, asyncHandler(petController.delete.bind(petController)));

module.exports = router;
