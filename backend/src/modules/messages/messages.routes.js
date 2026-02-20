const express = require('express');
const auth = require('../../middleware/auth');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./messages.controller');

const router = express.Router();
router.post('/', auth, asyncHandler(controller.createThread));
router.get('/', auth, asyncHandler(controller.getThreads));
router.get('/:id/messages', auth, asyncHandler(controller.getMessages));
router.post('/:id/messages', auth, asyncHandler(controller.sendMessage));

module.exports = router;
