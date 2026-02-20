const CoachProfile = require('../../models/CoachProfile');

exports.list = async (req, res) => {
  const filter = {};
  if (req.query.expertise) filter.expertise = req.query.expertise;
  const profiles = await CoachProfile.find(filter).populate('userId', 'firstName lastName email role');
  res.json({ coaches: profiles });
};

exports.getById = async (req, res) => {
  const coach = await CoachProfile.findOne({ userId: req.params.coachId }).populate('userId', 'firstName lastName email role');
  if (!coach) return res.status(404).json({ message: 'Coach profile not found' });
  res.json({ coach });
};

exports.updateMyProfile = async (req, res) => {
  const update = req.body;
  const profile = await CoachProfile.findOneAndUpdate({ userId: req.user.id }, update, { new: true, upsert: true });
  res.json({ coachProfile: profile });
};
