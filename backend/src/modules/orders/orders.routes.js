const express = require('express');
const auth = require('../../middleware/auth');
const rbac = require('../../middleware/rbac');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./orders.controller');

const router = express.Router();
router.get('/me', auth, asyncHandler(controller.myOrders));
router.get('/:id', auth, asyncHandler(controller.getById));
router.patch('/:id/status', auth, rbac(['coach', 'admin']), asyncHandler(controller.updateStatus));

module.exports = router;
