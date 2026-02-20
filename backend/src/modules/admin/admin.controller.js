const User = require('../../models/User');
const Payment = require('../../models/Payment');

exports.users = async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json({ users });
};

exports.suspendUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { accountStatus: 'suspended' }, { new: true }).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

exports.transactions = async (req, res) => {
  const transactions = await Payment.find().sort({ createdAt: -1 });
  res.json({ transactions });
};

exports.overview = async (req, res) => {
  const [users, coaches, revenue] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'coach' }),
    Payment.aggregate([{ $match: { status: 'captured' } }, { $group: { _id: null, total: { $sum: '$amount' } } }])
  ]);

  res.json({
    users,
    coaches,
    revenue: revenue[0]?.total || 0
  });
};
