const ServiceRequest = require('../../models/ServiceRequest');
const Order = require('../../models/Order');

exports.create = async (req, res) => {
  const payload = { ...req.body, clientId: req.user.id };
  const request = await ServiceRequest.create(payload);
  res.status(201).json({ request });
};

exports.myRequests = async (req, res) => {
  const requests = await ServiceRequest.find({ clientId: req.user.id }).sort({ createdAt: -1 });
  res.json({ requests });
};

exports.available = async (req, res) => {
  const requests = await ServiceRequest.find({ status: 'pending' }).sort({ createdAt: -1 });
  res.json({ requests });
};

exports.accept = async (req, res) => {
  const request = await ServiceRequest.findByIdAndUpdate(
    req.params.id,
    { status: 'accepted', selectedCoachId: req.user.id },
    { new: true }
  );
  if (!request) return res.status(404).json({ message: 'Request not found' });

  const order = await Order.findOneAndUpdate(
    { requestId: request._id },
    {
      requestId: request._id,
      clientId: request.clientId,
      coachId: req.user.id,
      amount: request.budget || 0,
      status: 'pending',
      $push: {
        progressTimeline: { status: 'pending', note: 'Order created', changedBy: req.user.id, changedAt: new Date() }
      }
    },
    { upsert: true, new: true }
  );

  res.json({ request, order });
};

exports.reject = async (req, res) => {
  const request = await ServiceRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  if (!request) return res.status(404).json({ message: 'Request not found' });
  res.json({ request });
};
