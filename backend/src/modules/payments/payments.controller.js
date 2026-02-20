const Payment = require('../../models/Payment');
const Order = require('../../models/Order');
const env = require('../../config/env');

exports.createCheckoutSession = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.clientId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

  const payment = await Payment.create({
    orderId: order._id,
    clientId: req.user.id,
    provider: 'stripe',
    amount: order.amount,
    currency: order.currency,
    status: 'created',
    metadata: { mock: !env.stripeSecretKey }
  });

  if (!env.stripeSecretKey) {
    return res.json({
      mode: 'mock',
      checkoutUrl: `${env.frontendUrl}/payments/mock-success?paymentId=${payment._id}`,
      payment
    });
  }

  return res.json({
    message: 'Stripe key configured. Integrate stripe SDK call in this controller for live checkout.',
    payment
  });
};

exports.stripeWebhook = async (req, res) => {
  const { paymentId, status } = req.body;
  if (paymentId) {
    const payment = await Payment.findByIdAndUpdate(paymentId, { status: status || 'captured' }, { new: true });
    if (payment && payment.status === 'captured') {
      await Order.findByIdAndUpdate(payment.orderId, { paid: true, status: 'in_progress' });
    }
  }
  res.json({ received: true });
};

exports.paypalOrder = async (req, res) => {
  res.json({ message: 'PayPal order endpoint scaffolded', payload: req.body });
};

exports.paypalCapture = async (req, res) => {
  res.json({ message: 'PayPal capture endpoint scaffolded', payload: req.body });
};
