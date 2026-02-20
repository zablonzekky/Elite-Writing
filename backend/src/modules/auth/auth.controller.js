const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const ApiError = require('../../utils/ApiError');
const { signAccessToken, signRefreshToken } = require('../../utils/tokens');
const env = require('../../config/env');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) throw new ApiError(409, 'Email already in use');

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
    role: role || 'client',
    emailVerified: false,
    accountStatus: 'pending_verification'
  });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  res.status(201).json({
    user: { id: user._id, email: user.email, role: user.role },
    accessToken,
    refreshToken
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findByIdAndUpdate(userId, { emailVerified: true, accountStatus: 'active' }, { new: true });
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ message: 'Email verified' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new ApiError(401, 'Invalid credentials');
  const matched = await bcrypt.compare(password, user.passwordHash);
  if (!matched) throw new ApiError(401, 'Invalid credentials');
  if (user.accountStatus === 'suspended') throw new ApiError(403, 'Account suspended');

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  res.json({ user: { id: user._id, email: user.email, role: user.role }, accessToken, refreshToken });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError(400, 'Missing refresh token');

  let payload;
  try {
    payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
  } catch (err) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const user = await User.findById(payload.sub);
  if (!user) throw new ApiError(401, 'Invalid refresh token');

  const accessToken = signAccessToken(user);
  const newRefreshToken = signRefreshToken(user);
  res.json({ accessToken, refreshToken: newRefreshToken });
};
