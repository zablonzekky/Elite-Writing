require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

// Initialize express app
const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Rate limiter for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    message: 'Too many contact form submissions from this IP, please try again after 15 minutes.',
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/user', authRoutes);
app.use('/api/contact/send', contactLimiter); // Apply rate limiter
app.use('/api/contact', contactRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Elite Writing Services API');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  writeConcern: { w: 'majority' },
})
.then(() => {
  console.log('✅ MongoDB Connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// Optional: Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});
