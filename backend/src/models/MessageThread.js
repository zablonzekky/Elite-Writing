const mongoose = require('mongoose');

const messageThreadSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', index: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserV2' }],
    lastMessageAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model('MessageThread', messageThreadSchema);
