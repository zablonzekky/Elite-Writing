# Elite Writing Services — Production-Ready System Blueprint

## 1) Backend Folder Structure (Node.js + Express + MongoDB)

```txt
backend/
  src/
    app.js
    server.js
    config/
      env.js
      db.js
      logger.js
      cloudinary.js
      stripe.js
      paypal.js
    modules/
      auth/
        auth.controller.js
        auth.service.js
        auth.validation.js
        auth.routes.js
      users/
        user.controller.js
        user.service.js
        user.validation.js
        user.routes.js
      coaches/
        coach.controller.js
        coach.service.js
        coach.validation.js
        coach.routes.js
      serviceRequests/
        request.controller.js
        request.service.js
        request.validation.js
        request.routes.js
      orders/
        order.controller.js
        order.service.js
        order.validation.js
        order.routes.js
      messages/
        message.controller.js
        message.service.js
        message.validation.js
        message.routes.js
      payments/
        payment.controller.js
        payment.service.js
        payment.routes.js
        webhooks.routes.js
      admin/
        admin.controller.js
        admin.service.js
        admin.routes.js
      files/
        file.controller.js
        file.service.js
        file.routes.js
    models/
      User.js
      CoachProfile.js
      ServiceRequest.js
      Order.js
      MessageThread.js
      Message.js
      Payment.js
      Transaction.js
      FileAsset.js
      Review.js
      Notification.js
    middleware/
      auth.js
      rbac.js
      validate.js
      upload.js
      errorHandler.js
      notFound.js
      rateLimit.js
      auditLog.js
    utils/
      ApiError.js
      asyncHandler.js
      pagination.js
      sanitize.js
      tokens.js
      date.js
    jobs/
      reminder.job.js
      orderEscalation.job.js
    sockets/
      index.js
      messaging.socket.js
    docs/
      openapi.yaml
    tests/
      unit/
      integration/
      e2e/
  .env.example
  package.json
```

### Why this structure scales
- **Modular by feature** (`modules/*`) to prevent huge controller/service files.
- **Shared cross-cutting concerns** in `middleware`, `utils`, and `config`.
- **Test tiers** for confident deployments: unit, integration, e2e.
- **Webhook separation** to avoid mixing internal payment APIs with provider callback handling.

---

## 2) MongoDB Schema Design

> Use Mongoose with timestamps enabled on all core collections.

### `users`
```js
{
  _id,
  role: 'client' | 'coach' | 'admin',
  firstName,
  lastName,
  email: { unique: true, index: true },
  passwordHash,
  emailVerified: { type: Boolean, default: false },
  phone,
  avatarUrl,
  accountStatus: 'active' | 'suspended' | 'pending_verification',
  lastLoginAt,
  createdAt,
  updatedAt
}
```

### `coachprofiles`
```js
{
  _id,
  userId: ObjectId(ref: 'User', unique: true, index: true),
  bio,
  expertise: [String], // CV, cover letter, LinkedIn
  yearsExperience,
  languages: [String],
  pricing: {
    cv: Number,
    coverLetter: Number,
    linkedin: Number,
    bundle: Number
  },
  ratingAvg: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  responseTimeHours,
  isAvailable: { type: Boolean, default: true },
  portfolioLinks: [String],
  createdAt,
  updatedAt
}
```

### `servicerequests`
```js
{
  _id,
  clientId: ObjectId(ref: 'User', index: true),
  selectedCoachId: ObjectId(ref: 'User', index: true),
  serviceType: 'cv' | 'cover_letter' | 'linkedin' | 'bundle',
  title,
  requirements,
  deadline,
  budget,
  status: 'pending' | 'accepted' | 'rejected' | 'expired',
  attachmentIds: [ObjectId(ref: 'FileAsset')],
  createdAt,
  updatedAt
}
```

### `orders`
```js
{
  _id,
  requestId: ObjectId(ref: 'ServiceRequest', unique: true),
  clientId: ObjectId(ref: 'User', index: true),
  coachId: ObjectId(ref: 'User', index: true),
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'disputed',
  progressTimeline: [
    {
      status,
      note,
      changedBy: ObjectId(ref: 'User'),
      changedAt: Date
    }
  ],
  deliveryFileIds: [ObjectId(ref: 'FileAsset')],
  amount,
  currency: { type: String, default: 'USD' },
  paid: { type: Boolean, default: false },
  completedAt,
  createdAt,
  updatedAt
}
```

### `payments`
```js
{
  _id,
  orderId: ObjectId(ref: 'Order', index: true),
  clientId: ObjectId(ref: 'User', index: true),
  provider: 'stripe' | 'paypal',
  providerPaymentId: { type: String, index: true },
  amount,
  currency,
  status: 'created' | 'authorized' | 'captured' | 'failed' | 'refunded',
  metadata: Object,
  webhookEvents: [
    {
      eventId: String,
      type: String,
      payload: Object,
      receivedAt: Date
    }
  ],
  createdAt,
  updatedAt
}
```

### `messagethreads`
```js
{
  _id,
  orderId: ObjectId(ref: 'Order', index: true),
  participants: [ObjectId(ref: 'User')],
  lastMessageAt,
  createdAt,
  updatedAt
}
```

### `messages`
```js
{
  _id,
  threadId: ObjectId(ref: 'MessageThread', index: true),
  senderId: ObjectId(ref: 'User', index: true),
  body,
  attachmentIds: [ObjectId(ref: 'FileAsset')],
  readBy: [ObjectId(ref: 'User')],
  createdAt,
  updatedAt
}
```

### `fileassets`
```js
{
  _id,
  ownerId: ObjectId(ref: 'User', index: true),
  storageProvider: 's3' | 'cloudinary' | 'local_dev',
  storageKey,
  originalName,
  mimeType,
  sizeBytes,
  category: 'cv_upload' | 'delivery' | 'message_attachment' | 'avatar',
  scanStatus: 'pending' | 'clean' | 'infected',
  createdAt,
  updatedAt
}
```

### `transactions` (for finance and admin analytics)
```js
{
  _id,
  paymentId: ObjectId(ref: 'Payment', index: true),
  orderId: ObjectId(ref: 'Order', index: true),
  grossAmount,
  platformFee,
  coachPayout,
  currency,
  transactionType: 'charge' | 'refund' | 'payout',
  createdAt,
  updatedAt
}
```

---

## 3) REST API Endpoints (v1)

### Auth
- `POST /api/v1/auth/register` (client/coach)
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/verify-email`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `POST /api/v1/auth/logout`

### Users & Coaches
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `GET /api/v1/coaches` (filters: expertise, price range, rating)
- `GET /api/v1/coaches/:coachId`
- `PATCH /api/v1/coaches/me/profile`

### Service Requests
- `POST /api/v1/requests`
- `GET /api/v1/requests/me` (client)
- `GET /api/v1/requests/available` (coach)
- `PATCH /api/v1/requests/:id/accept` (coach)
- `PATCH /api/v1/requests/:id/reject` (coach)

### Orders
- `GET /api/v1/orders/me`
- `GET /api/v1/orders/:id`
- `PATCH /api/v1/orders/:id/status` (coach/admin)
- `POST /api/v1/orders/:id/delivery-files`
- `GET /api/v1/orders/:id/download`

### Messaging
- `POST /api/v1/threads`
- `GET /api/v1/threads`
- `GET /api/v1/threads/:id/messages`
- `POST /api/v1/threads/:id/messages`
- Optional socket events: `message:send`, `message:read`, `thread:typing`

### Files
- `POST /api/v1/files/upload` (PDF/DOCX only)
- `GET /api/v1/files/:id` (signed URL/stream)
- `DELETE /api/v1/files/:id`

### Payments
- `POST /api/v1/payments/checkout-session` (Stripe)
- `POST /api/v1/payments/paypal/order`
- `POST /api/v1/payments/paypal/capture`
- `POST /api/v1/payments/webhook/stripe`
- `POST /api/v1/payments/webhook/paypal`

### Admin
- `GET /api/v1/admin/users`
- `PATCH /api/v1/admin/users/:id/suspend`
- `PATCH /api/v1/admin/coaches/:id/verify`
- `GET /api/v1/admin/transactions`
- `GET /api/v1/admin/analytics/overview`

---

## 4) Authentication Implementation (JWT + RBAC)

### Recommended token strategy
- **Access token (short-lived, 15m)** in HTTP-only secure cookie (or bearer token if SPA policy requires).
- **Refresh token (7–30 days)** stored hashed in DB with rotation.
- Include claims: `sub`, `role`, `emailVerified`, `tokenVersion`.

### Core flow
1. User registers.
2. Hash password with `bcrypt` (12 rounds).
3. Send email verification token.
4. On login, issue access + refresh tokens.
5. Protect routes with `auth` middleware.
6. Restrict route access by `rbac(['admin'])`, `rbac(['coach'])`, etc.

### Minimal middleware example
```js
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: payload.sub, role: payload.role, emailVerified: payload.emailVerified };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

```js
// middleware/rbac.js
module.exports = (roles = []) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
```

### Security controls
- Rate-limit auth endpoints.
- Lock account temporarily after repeated failed logins.
- Validate all payloads with `zod`/`joi`.
- Store secrets in env manager (never in repo).

---

## 5) Payment Integration Example (Stripe)

### Server endpoint to create checkout session
```js
// modules/payments/payment.controller.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { orderId } = req.body;

  // 1) Load order, confirm ownership and unpaid state
  // 2) Build Stripe session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: `Elite Writing Order #${orderId}` },
          unit_amount: 14900
        },
        quantity: 1
      }
    ],
    success_url: `${process.env.FRONTEND_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payments/cancel`,
    metadata: { orderId, clientId: req.user.id }
  });

  // 3) Persist payment record with status=created
  return res.json({ checkoutUrl: session.url });
};
```

### Stripe webhook (must verify signature)
```js
// modules/payments/webhooks.routes.js
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // mark payment captured, set order.paid=true, status='in_progress'
  }

  return res.json({ received: true });
});
```

> Replicate equivalent logic for PayPal webhooks (`CHECKOUT.ORDER.APPROVED`, `PAYMENT.CAPTURE.COMPLETED`).

---

## 6) React Frontend Layout (Bootstrap)

## Suggested app structure
```txt
frontend/src/
  app/
    router.jsx
    store.js
  api/
    client.js
    auth.api.js
    orders.api.js
    payments.api.js
  features/
    auth/
    landing/
    coaches/
    requests/
    orders/
    messaging/
    admin/
  components/
    layout/
      Navbar.jsx
      Footer.jsx
      DashboardShell.jsx
    common/
      Button.jsx
      Spinner.jsx
      ProtectedRoute.jsx
      RoleRoute.jsx
  pages/
    LandingPage.jsx
    LoginPage.jsx
    RegisterPage.jsx
    ClientDashboard.jsx
    CoachDashboard.jsx
    AdminDashboard.jsx
    RequestDetailsPage.jsx
    OrderPage.jsx
    MessagesPage.jsx
  styles/
    theme.scss
```

## Landing page sections (Bootstrap)
1. **Hero**: headline + CTA buttons (`Get Started`, `Find a Coach`).
2. **Services Offered**: cards for CV, cover letter, LinkedIn.
3. **How It Works**: 3-step timeline.
4. **Pricing Plans**: monthly/one-off cards.
5. **Testimonials**: carousel.
6. **CTA Banner**: “Upload your CV today”.
7. **Footer**: links, social, contact.

## Role-based dashboard UI
- **Client dashboard**: active orders, upload area, payment status, chat panel.
- **Coach dashboard**: incoming requests, accepted jobs, delivery uploader.
- **Admin dashboard**: users table, transactions chart, moderation actions.

---

## 7) Production Readiness and Scalability Checklist

### Infrastructure
- Dockerize frontend + backend.
- Use Nginx/API gateway.
- Deploy MongoDB as managed cluster (Atlas).
- Store files in S3 (or Cloudinary).
- Use Redis for caching, sessions, and queue support.

### Performance
- Add indexes on `email`, `order.status`, `clientId`, `coachId`, `createdAt`.
- Use cursor pagination for list endpoints.
- Compress responses (`compression`) and enable HTTP caching headers.

### Reliability
- Centralized structured logging (`pino`/`winston`) with request IDs.
- Health checks: `/health`, `/ready`.
- Background jobs for reminders and stale-request cleanup.

### Security
- Helmet, CORS allowlist, rate limiting, request size limits.
- Virus scan uploads (e.g., ClamAV worker).
- Signed URLs for secure file downloads.
- Enforce HTTPS and secure cookies.

### CI/CD
- GitHub Actions pipeline:
  - lint
  - test
  - build
  - security scan (`npm audit`, SAST)
  - deploy

### Observability
- Error tracking: Sentry.
- Metrics: Prometheus + Grafana or hosted equivalent.
- Alerts on payment webhook failures and 5xx spikes.

---

## 8) Suggested Build Order (Milestones)

1. Auth + RBAC + user roles.
2. Coach profiles + client request flow.
3. Orders + status tracking.
4. File uploads/downloads with secure storage.
5. Stripe payments + webhook finalization.
6. Messaging module.
7. Admin dashboard + analytics.
8. Hardening + load tests + launch.

This sequence gets you to a usable MVP quickly, then adds monetization, communication, and operational maturity in a safe order.
