const express = require('express');
const auth = require('../../middleware/auth');
const asyncHandler = require('../../utils/asyncHandler');
const controller = require('./payments.controller');

const router = express.Router();
router.post('/checkout-session', auth, asyncHandler(controller.createCheckoutSession));
router.post('/paypal/order', auth, asyncHandler(controller.paypalOrder));
router.post('/paypal/capture', auth, asyncHandler(controller.paypalCapture));
router.post('/webhook/stripe', asyncHandler(controller.stripeWebhook));
router.post('/webhook/paypal', asyncHandler(controller.paypalCapture));

module.exports = router;
