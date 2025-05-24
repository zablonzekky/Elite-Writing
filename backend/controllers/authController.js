const HttpError = require("../models/http-error");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

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
    console.error("❌ Get Users Error:", err);
    return next(new HttpError("Fetching users failed", 500));
  }
};

// === Get Single User ===
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.uid, "-password");
    if (!user) throw new Error("User not found");
    res.status(200).json({ user: user.toObject({ getters: true }) });
  } catch (err) {
    console.error("❌ Get User Error:", err);
    return next(new HttpError("User not found", 404));
  }
};

// === User Login ===
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log("➡️ Login attempt for:", email);
    console.log("➡️ Password received from frontend:", password);

    const user = await User.findOne({ email });
    if (!user) {
      console.warn("⚠️ Login failed: Email not found");
      return next(new HttpError("Invalid credentials", 401));
    }

    console.log("➡️ Hashed password in DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match result:", isMatch);

    if (!isMatch) {
      console.warn("⚠️ Login failed: Incorrect password");
      return next(new HttpError("Invalid credentials", 401));
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log(`✅ Login successful for user: ${email}`);
    res.status(200).json({ userId: user.id, email: user.email, token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return next(new HttpError("Login failed. Try again later.", 500));
  }
};

// === Check Email Before Signup (Send Code) ===
const checkEmail = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    if (!email || !name) {
      return next(new HttpError("Email and name are required", 400));
    }

    const existingEmail = await User.findOne({ email });
    const existingName = await User.findOne({ name });

    if (existingEmail || existingName) {
      return next(new HttpError("User already exists", 409));
    }

    const code = generateCode();
    const hashedCode = await bcrypt.hash(code, 12);

    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Your Verification Code",
      text: `Your Freelance verification code is: ${code}`,
    });

    console.log(`✅ Verification code sent to ${email}`);
    res.status(200).json({ code: hashedCode });
  } catch (err) {
    console.error("❌ Verification Email Error:", err);
    return next(new HttpError("Failed to send verification email", 500));
  }
};

// === Signup New User ===
const signup = async (req, res, next) => {
  const { name, email, password, hashedCode, code } = req.body;

  try {
    if (!name || !email || !password || !hashedCode || !code) {
      return next(new HttpError("All fields are required", 400));
    }

    const isCodeValid = await bcrypt.compare(code, hashedCode);
    if (!isCodeValid) {
      console.warn(`⚠️ Incorrect verification code for ${email}`);
      return next(new HttpError("Verification code is incorrect", 400));
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

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const transporter = createTransporter();
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "Welcome to Freelance!",
        text: "You've successfully signed up. Welcome aboard!",
      });
    } catch (emailError) {
      console.warn("⚠️ Signup succeeded but welcome email failed:", emailError.message);
    }

    console.log(`✅ Signup successful for user: ${email}`);
    res.status(201).json({ userId: user.id, email: user.email, token });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    return next(new HttpError("Signup failed", 500));
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.login = login;
exports.signup = signup;
exports.checkEmail = checkEmail;
