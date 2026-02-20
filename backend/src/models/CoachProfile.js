const mongoose = require('mongoose');

const coachProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserV2', unique: true, index: true, required: true },
    bio: { type: String, default: '' },
    expertise: [{ type: String }],
    pricing: {
      cv: { type: Number, default: 0 },
      coverLetter: { type: Number, default: 0 },
      linkedin: { type: Number, default: 0 },
      bundle: { type: Number, default: 0 }
    },
    isAvailable: { type: Boolean, default: true },
    ratingAvg: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CoachProfile', coachProfileSchema);
