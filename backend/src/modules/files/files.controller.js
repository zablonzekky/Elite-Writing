const path = require('path');
const fs = require('fs');
const FileAsset = require('../../models/FileAsset');

exports.upload = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const asset = await FileAsset.create({
    ownerId: req.user.id,
    storageProvider: 'local_dev',
    storageKey: req.file.path,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    sizeBytes: req.file.size,
    category: req.body.category || 'cv_upload'
  });
  res.status(201).json({ file: asset });
};

exports.getById = async (req, res) => {
  const file = await FileAsset.findById(req.params.id);
  if (!file) return res.status(404).json({ message: 'File not found' });
  if (file.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const absolute = path.isAbsolute(file.storageKey) ? file.storageKey : path.join(process.cwd(), file.storageKey);
  return res.download(absolute, file.originalName);
};

exports.remove = async (req, res) => {
  const file = await FileAsset.findById(req.params.id);
  if (!file) return res.status(404).json({ message: 'File not found' });
  if (file.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (fs.existsSync(file.storageKey)) fs.unlinkSync(file.storageKey);
  await file.deleteOne();
  res.json({ message: 'Deleted' });
};
