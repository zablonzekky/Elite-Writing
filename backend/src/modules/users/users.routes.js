const express = require('express');
const auth = require('../../middleware/auth');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./users.controller');

const router = express.Router();
router.get('/me', auth, asyncHandler(controller.getMe));
router.patch('/me', auth, asyncHandler(controller.updateMe));

module.exports = router;
