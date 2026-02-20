const express = require('express');
const auth = require('../../middleware/auth');
const rbac = require('../../middleware/rbac');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./coaches.controller');

const router = express.Router();
router.get('/', asyncHandler(controller.list));
router.get('/:coachId', asyncHandler(controller.getById));
router.patch('/me/profile', auth, rbac(['coach']), asyncHandler(controller.updateMyProfile));

module.exports = router;
