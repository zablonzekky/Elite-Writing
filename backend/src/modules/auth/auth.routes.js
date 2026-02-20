const express = require('express');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./auth.controller');

const router = express.Router();

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.post('/verify-email', asyncHandler(controller.verifyEmail));
router.post('/refresh-token', asyncHandler(controller.refreshToken));

module.exports = router;
