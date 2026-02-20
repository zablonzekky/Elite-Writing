const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./modules/auth/auth.routes');
const usersRoutes = require('./modules/users/users.routes');
const coachesRoutes = require('./modules/coaches/coaches.routes');
const requestRoutes = require('./modules/serviceRequests/requests.routes');
const ordersRoutes = require('./modules/orders/orders.routes');
const messageRoutes = require('./modules/messages/messages.routes');
const filesRoutes = require('./modules/files/files.routes');
const paymentRoutes = require('./modules/payments/payments.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.use(
  '/api/v1/auth',
  rateLimit({ windowMs: 15 * 60 * 1000, max: 80, standardHeaders: true, legacyHeaders: false }),
  authRoutes
);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/coaches', coachesRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/threads', messageRoutes);
app.use('/api/v1/files', filesRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
