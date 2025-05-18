require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug logs to verify imported routers
console.log('Auth Routes:', authRoutes);
console.log('Contact Routes:', contactRoutes);

// Routes
app.use('/api/auth', authRoutes);      // Use router directly (no .router)
app.use('/api/contact', contactRoutes);

// Root route for quick test
app.get('/', (req, res) => {
  res.send('Welcome to Elite Writing Services API');
});

// Fallback 404 route for undefined paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  // Removed deprecated w: 'majority' in favor of writeConcern
  writeConcern: { w: 'majority' },
})
  .then(() => {
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
