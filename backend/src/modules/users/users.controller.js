const User = require('../../models/User');
const ApiError = require('../../utils/ApiError');

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ user });
};

exports.updateMe = async (req, res) => {
  const allowed = ['firstName', 'lastName'];
  const payload = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const user = await User.findByIdAndUpdate(req.user.id, payload, { new: true }).select('-passwordHash');
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ user });
};
