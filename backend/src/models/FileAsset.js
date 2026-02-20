const mongoose = require('mongoose');

const fileAssetSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', required: true, index: true },
    storageProvider: { type: String, enum: ['local_dev', 's3', 'cloudinary'], default: 'local_dev' },
    storageKey: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    category: { type: String, enum: ['cv_upload', 'delivery', 'message_attachment', 'avatar'], default: 'cv_upload' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FileAsset', fileAssetSchema);
