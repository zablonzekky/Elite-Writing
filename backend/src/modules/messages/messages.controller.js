const MessageThread = require('../../models/MessageThread');
const Message = require('../../models/Message');

exports.createThread = async (req, res) => {
  const thread = await MessageThread.create({ ...req.body, lastMessageAt: new Date() });
  res.status(201).json({ thread });
};

exports.getThreads = async (req, res) => {
  const threads = await MessageThread.find({ participants: req.user.id }).sort({ lastMessageAt: -1 });
  res.json({ threads });
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({ threadId: req.params.id }).sort({ createdAt: 1 });
  res.json({ messages });
};

exports.sendMessage = async (req, res) => {
  const message = await Message.create({
    threadId: req.params.id,
    senderId: req.user.id,
    body: req.body.body,
    attachmentIds: req.body.attachmentIds || [],
    readBy: [req.user.id]
  });
  await MessageThread.findByIdAndUpdate(req.params.id, { lastMessageAt: new Date() });
  res.status(201).json({ message });
};
