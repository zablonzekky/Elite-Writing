const Order = require('../../models/Order');

exports.myOrders = async (req, res) => {
  const filter = req.user.role === 'coach' ? { coachId: req.user.id } : { clientId: req.user.id };
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json({ orders });
};

exports.getById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ order });
};

exports.updateStatus = async (req, res) => {
  const { status, note } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status,
      $push: { progressTimeline: { status, note, changedBy: req.user.id, changedAt: new Date() } }
    },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ order });
};
