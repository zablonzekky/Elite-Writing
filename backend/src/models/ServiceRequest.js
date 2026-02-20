const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', index: true, required: true },
    selectedCoachId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', index: true, required: true },
    serviceType: { type: String, enum: ['cv', 'cover_letter', 'linkedin', 'bundle'], required: true },
    title: { type: String, required: true },
    requirements: { type: String, required: true },
    deadline: Date,
    budget: Number,
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'expired'], default: 'pending' },
    attachmentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileAsset' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
