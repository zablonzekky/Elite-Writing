const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', index: true, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', index: true, required: true },
    provider: { type: String, enum: ['stripe', 'paypal'], required: true },
    providerPaymentId: { type: String, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['created', 'authorized', 'captured', 'failed', 'refunded'], default: 'created' },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
