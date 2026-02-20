const express = require('express');
const auth = require('../../middleware/auth');
const rbac = require('../../middleware/rbac');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./admin.controller');

const router = express.Router();
router.use(auth, rbac(['admin']));
router.get('/users', asyncHandler(controller.users));
router.patch('/users/:id/suspend', asyncHandler(controller.suspendUser));
router.get('/transactions', asyncHandler(controller.transactions));
router.get('/analytics/overview', asyncHandler(controller.overview));

module.exports = router;
