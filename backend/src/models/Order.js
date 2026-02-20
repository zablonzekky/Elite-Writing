const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceRequest', unique: true, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', index: true, required: true },
    coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', index: true, required: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'cancelled', 'disputed'],
      default: 'pending',
      index: true
    },
    progressTimeline: [
      {
        status: String,
        note: String,
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2' },
        changedAt: Date
      }
    ],
    deliveryFileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileAsset' }],
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    paid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
