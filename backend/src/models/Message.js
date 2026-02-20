const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'MessageThread', index: true, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', index: true, required: true },
    body: { type: String, required: true },
    attachmentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileAsset' }],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserV2' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
