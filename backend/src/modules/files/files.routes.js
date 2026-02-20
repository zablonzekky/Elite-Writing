const express = require('express');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./files.controller');

const router = express.Router();
router.post('/upload', auth, upload.single('file'), asyncHandler(controller.upload));
router.get('/:id', auth, asyncHandler(controller.getById));
router.delete('/:id', auth, asyncHandler(controller.remove));

module.exports = router;
