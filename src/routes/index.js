const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const ownerRoutes = require('./ownerRoutes');
const petRoutes = require('./petRoutes');
const serviceTypeRoutes = require('./serviceTypeRoutes');
const serviceRoutes = require('./serviceRoutes');
const utilityRoutes = require('./utilityRoutes');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.use('/auth', authRoutes);
router.use(authenticate);
router.use('/users', userRoutes);
router.use('/owners', ownerRoutes);
router.use('/pets', petRoutes);
router.use('/service-types', serviceTypeRoutes);
router.use('/services', serviceRoutes);
router.use('/utils', utilityRoutes);

module.exports = router;
