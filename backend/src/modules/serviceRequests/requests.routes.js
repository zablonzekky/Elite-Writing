const express = require('express');
const auth = require('../../middleware/auth');
const rbac = require('../../middleware/rbac');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./requests.controller');

const router = express.Router();
router.post('/', auth, rbac(['client']), asyncHandler(controller.create));
router.get('/me', auth, rbac(['client']), asyncHandler(controller.myRequests));
router.get('/available', auth, rbac(['coach']), asyncHandler(controller.available));
router.patch('/:id/accept', auth, rbac(['coach']), asyncHandler(controller.accept));
router.patch('/:id/reject', auth, rbac(['coach']), asyncHandler(controller.reject));

module.exports = router;
