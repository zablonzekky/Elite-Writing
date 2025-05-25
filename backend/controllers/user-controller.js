const HttpError = require("../models/http-error");
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// In-memory store for verification codes (email -> hashedCode)
const verificationCodes = new Map();

// === Helper to generate a random 4-digit code ===
const generateCode = () =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");

// === Nodemailer Transport Setup ===
const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

// === Get All Users ===
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({ users: users.map((u) => u.toObject({ getters: true })) });
  } catch (err) {
    console.error("getUsers error:", err);
    return next(new HttpError("Fetching users failed", 500));
  }
};

// === Get Single User ===
const getUser = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const user = await User.findById(uid, "-password");
    if (!user) throw new Error();
    res.status(200).json({ user: user.toObject({ getters: true }) });
  } catch (err) {
    console.error("getUser error:", err);
    return next(new HttpError("User not found", 404));
  }
};

// === User Login ===
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new HttpError("Invalid credentials", 401));
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ userId: user.id, email: user.email, token });
  } catch (err) {
    console.error("login error:", err);
    return next(new HttpError("Login failed. Try again later.", 500));
  }
};

// === Check Email Before Signup (Send Verification Code) ===
const checkEmail = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ name });

    if (userEmail || userName) {
      return next(new HttpError("User already exists", 409));
    }

    const code = generateCode();
    const hashedCode = await bcrypt.hash(code, 12);

    // Store hashed code in server-side map with expiry (10 minutes)
    verificationCodes.set(email, hashedCode);
    setTimeout(() => verificationCodes.delete(email), 10 * 60 * 1000);

    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Your Verification Code",
      text: `Your Freelance verification code is ${code}`,
    });

    // Only send success message, NOT the hashedCode
    res.status(200).json({ message: "Verification code sent to email" });
  } catch (err) {
    console.error("checkEmail error:", err);
    return next(new HttpError("Failed to send verification email", 500));
  }
};

// === Signup New User ===
const signup = async (req, res, next) => {
  const { name, email, password, code } = req.body;

  try {
    const storedHashedCode = verificationCodes.get(email);

    if (!storedHashedCode || !(await bcrypt.compare(code, storedHashedCode))) {
      return next(new HttpError("Verification code is incorrect or expired", 400));
    }

    const userExists = await User.findOne({ $or: [{ email }, { name }] });
    if (userExists) {
      return next(new HttpError("User already exists", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      image: req.file?.path || "uploads/default.jpg",
      products: [],
    });

    await user.save();

    // Clear verification code after successful signup
    verificationCodes.delete(email);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Welcome to Freelance!",
      text: "You've successfully signed up. Welcome aboard!",
    });

    res.status(201).json({ userId: user.id, email: user.email, token });
  } catch (err) {
    console.error("signup error:", err);
    return next(new HttpError("Signup failed", 500));
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.login = login;
exports.signup = signup;
exports.checkEmail = checkEmail;
