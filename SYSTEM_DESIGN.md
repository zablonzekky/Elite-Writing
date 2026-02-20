# Elite Writing Services – Production-Ready Full-Stack Blueprint

## 1) Backend Folder Structure (Node.js + Express + MongoDB)

```txt
backend/
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ config/
│  │  ├─ env.js
│  │  ├─ db.js
│  │  ├─ logger.js
│  │  └─ stripe.js
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.js
│  │  │  ├─ auth.service.js
│  │  │  ├─ auth.routes.js
│  │  │  ├─ auth.validation.js
│  │  │  └─ auth.tokens.js
│  │  ├─ users/
│  │  │  ├─ user.controller.js
│  │  │  ├─ user.service.js
│  │  │  ├─ user.routes.js
│  │  │  └─ user.validation.js
│  │  ├─ coaches/
│  │  │  ├─ coach.controller.js
│  │  │  ├─ coach.service.js
│  │  │  ├─ coach.routes.js
│  │  │  └─ coach.validation.js
│  │  ├─ orders/
│  │  │  ├─ order.controller.js
│  │  │  ├─ order.service.js
│  │  │  ├─ order.routes.js
│  │  │  └─ order.validation.js
│  │  ├─ payments/
│  │  │  ├─ payment.controller.js
│  │  │  ├─ payment.service.js
│  │  │  ├─ payment.routes.js
│  │  │  └─ webhooks.routes.js
│  │  ├─ messages/
│  │  │  ├─ message.controller.js
│  │  │  ├─ message.service.js
│  │  │  ├─ message.routes.js
│  │  │  └─ socket.js
│  │  ├─ uploads/
│  │  │  ├─ upload.controller.js
│  │  │  ├─ upload.service.js
│  │  │  ├─ upload.routes.js
│  │  │  └─ storage.js
│  │  └─ admin/
│  │     ├─ admin.controller.js
│  │     ├─ admin.service.js
│  │     ├─ admin.routes.js
│  │     └─ admin.analytics.js
│  ├─ middleware/
│  │  ├─ auth.middleware.js
│  │  ├─ roles.middleware.js
│  │  ├─ error.middleware.js
│  │  ├─ validate.middleware.js
│  │  ├─ rateLimit.middleware.js
│  │  └─ upload.middleware.js
│  ├─ models/
│  │  ├─ User.js
│  │  ├─ CoachProfile.js
│  │  ├─ ServiceRequest.js
│  │  ├─ Order.js
│  │  ├─ MessageThread.js
│  │  ├─ Message.js
│  │  ├─ FileAsset.js
│  │  ├─ Payment.js
│  │  └─ AuditLog.js
│  ├─ jobs/
│  │  ├─ sendEmails.job.js
│  │  ├─ generateInvoice.job.js
│  │  └─ cleanupUploads.job.js
│  ├─ utils/
│  │  ├─ ApiError.js
│  │  ├─ asyncHandler.js
│  │  ├─ pagination.js
│  │  ├─ permissions.js
│  │  └─ constants.js
│  └─ docs/
│     └─ openapi.yaml
├─ tests/
│  ├─ integration/
│  ├─ unit/
│  └─ e2e/
├─ package.json
├─ .env.example
└─ Dockerfile
```

---

## 2) MongoDB Schema Design

### User
- `_id`
- `role`: `client | coach | admin`
- `name`
- `email` (unique, indexed)
- `passwordHash`
- `isEmailVerified`
- `status`: `active | suspended`
- `avatarUrl`
- `lastLoginAt`
- `createdAt`, `updatedAt`

### CoachProfile
- `userId` (ref User, unique)
- `bio`
- `expertise`: string[] (ATS CV, executive CV, cover letter, LinkedIn)
- `yearsExperience`
- `languages`: string[]
- `pricing`: 
  - `cv`
  - `coverLetter`
  - `linkedin`
- `ratingAvg`
- `ratingCount`
- `isAvailable`
- `portfolioSamples`: string[]

### ServiceRequest
- `clientId` (ref User)
- `coachId` (ref User, optional until chosen)
- `type`: `cv | cover_letter | linkedin | bundle`
- `details` (goals, target role, industry)
- `uploadedFiles`: ref FileAsset[]
- `budget`
- `deadline`
- `status`: `open | accepted | rejected | cancelled`

### Order
- `serviceRequestId`
- `clientId`
- `coachId`
- `status`: `pending | in_progress | completed | disputed`
- `milestones`: array `{ title, status, dueDate }`
- `finalFiles`: ref FileAsset[]
- `deliveredAt`
- `completedAt`

### MessageThread
- `participants`: userIds[]
- `orderId` (optional)
- `lastMessageAt`

### Message
- `threadId`
- `senderId`
- `content`
- `attachments`: ref FileAsset[]
- `readBy`: userIds[]

### FileAsset
- `ownerId`
- `storageProvider`: `s3 | local | cloudinary`
- `bucket`
- `key`
- `originalName`
- `mimeType`
- `size`
- `checksum`
- `isPrivate`

### Payment
- `orderId`
- `clientId`
- `coachId`
- `provider`: `stripe | paypal`
- `providerPaymentIntentId` (or PayPal order id)
- `amount`
- `currency`
- `status`: `requires_payment | succeeded | failed | refunded`
- `webhookEvents`: object[]
- `paidAt`

### AuditLog
- `actorId`
- `action`
- `entityType`
- `entityId`
- `metadata`
- `ip`
- `userAgent`

**Indexes to add**
- `User.email` unique
- `Order.clientId + status`
- `Order.coachId + status`
- `ServiceRequest.clientId + createdAt`
- `Message.threadId + createdAt`
- `Payment.providerPaymentIntentId` unique

---

## 3) REST API Endpoints (v1)

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/verify-email`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `POST /api/v1/auth/logout`

### Users / Coaches
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `GET /api/v1/coaches` (filter/sort/pagination)
- `GET /api/v1/coaches/:coachId`
- `PATCH /api/v1/coaches/me/profile`

### Service Requests + Orders
- `POST /api/v1/requests`
- `GET /api/v1/requests/my`
- `PATCH /api/v1/requests/:id/assign-coach`
- `PATCH /api/v1/requests/:id/accept`
- `PATCH /api/v1/requests/:id/reject`
- `POST /api/v1/orders`
- `GET /api/v1/orders/my`
- `GET /api/v1/orders/:id`
- `PATCH /api/v1/orders/:id/status` (Pending → In Progress → Completed)
- `POST /api/v1/orders/:id/deliverables`

### Messaging
- `POST /api/v1/threads`
- `GET /api/v1/threads`
- `GET /api/v1/threads/:id/messages`
- `POST /api/v1/threads/:id/messages`
- `PATCH /api/v1/threads/:id/read`

### Uploads
- `POST /api/v1/uploads/presigned-url`
- `POST /api/v1/uploads/complete`
- `DELETE /api/v1/uploads/:assetId`

### Payments
- `POST /api/v1/payments/intent`
- `POST /api/v1/payments/confirm`
- `POST /api/v1/payments/webhooks/stripe`
- `POST /api/v1/payments/webhooks/paypal`
- `GET /api/v1/payments/:orderId`

### Admin
- `GET /api/v1/admin/users`
- `PATCH /api/v1/admin/users/:id/suspend`
- `PATCH /api/v1/admin/users/:id/unsuspend`
- `GET /api/v1/admin/transactions`
- `GET /api/v1/admin/analytics/overview`

---

## 4) Authentication Implementation (JWT + bcrypt)

### Recommended flow
1. Register user with role.
2. Hash password with bcrypt (`12+` salt rounds).
3. Send email verification token (short-lived signed token).
4. On login, issue:
   - access token (15 min)
   - refresh token (7–30 days, stored hashed in DB)
5. Rotate refresh token on each refresh call.
6. Revoke token on logout/password change.

### Minimal implementation sketch

```js
// auth.tokens.js
const jwt = require('jsonwebtoken');

const signAccessToken = (user) =>
  jwt.sign(
    { sub: user._id, role: user.role, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

const signRefreshToken = (user, tokenId) =>
  jwt.sign(
    { sub: user._id, tokenId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

module.exports = { signAccessToken, signRefreshToken };
```

```js
// auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid/Expired token' });
  }
};
```

```js
// roles.middleware.js
module.exports = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
```

---

## 5) Payment Integration Example (Stripe)

### Server: create PaymentIntent

```js
// payment.controller.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createIntent = async (req, res) => {
  const { orderId, amount, currency = 'usd' } = req.body;

  const intent = await stripe.paymentIntents.create({
    amount, // in cents
    currency,
    metadata: { orderId, clientId: req.user.id },
    automatic_payment_methods: { enabled: true }
  });

  res.json({ clientSecret: intent.client_secret, intentId: intent.id });
};
```

### Webhook verification

```js
// webhooks.routes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    // verify metadata/order amount, then mark Payment & Order as paid
  }

  return res.json({ received: true });
});

module.exports = router;
```

> For PayPal, use a similar pattern: create order on server, capture on client/server, and verify via webhook before finalizing order status.

---

## 6) React Frontend Layout Suggestion (Bootstrap)

```txt
frontend/
├─ src/
│  ├─ app/
│  │  ├─ AppRouter.jsx
│  │  ├─ store.js
│  │  └─ apiClient.js
│  ├─ features/
│  │  ├─ auth/
│  │  ├─ landing/
│  │  ├─ client/
│  │  ├─ coach/
│  │  ├─ orders/
│  │  ├─ messages/
│  │  ├─ payments/
│  │  └─ admin/
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ forms/
│  │  ├─ tables/
│  │  └─ feedback/
│  ├─ hooks/
│  ├─ utils/
│  ├─ styles/
│  └─ main.jsx
```

### Landing page sections
1. **Hero**: “Professional CV writing made easy” + CTA buttons.
2. **Services Offered**: CV, cover letter, LinkedIn optimization.
3. **How It Works**: Request → Match Coach → Review Draft → Final Delivery.
4. **Pricing Plans**: Starter, Professional, Executive cards.
5. **Testimonials**: carousel/grid with ratings.
6. **Call to Action**: “Get your CV reviewed today.”
7. **Footer**: links, contact, socials.

### Role dashboards
- **Client dashboard**: request form, upload center, order timeline, chat.
- **Coach dashboard**: incoming requests, active jobs, delivery upload.
- **Admin dashboard**: users/coaches table, transactions, KPIs.

---

## 7) Security + Production Readiness Checklist

### Security
- bcrypt hashing with strong salt rounds.
- JWT short access token + refresh token rotation.
- Rate limit auth endpoints.
- Helmet + CORS allowlist.
- Joi/Zod validation on all inputs.
- Upload validation: MIME + extension + max file size + malware scan.
- Private file storage with signed URLs (S3 recommended).
- Webhook signature verification for payments.
- Audit logs for admin and payment state changes.

### Scalability
- Use Redis for caching sessions, rate limits, queues.
- Queue long jobs (emails, document processing) with BullMQ.
- Store files on S3 + CDN.
- Use MongoDB indexes + pagination cursor strategy.
- Add observability (Winston/Pino + OpenTelemetry).
- Deploy with Docker, separate envs (dev/stage/prod).
- CI/CD with tests + lint + security scan.
- API versioning (`/api/v1`).

### Suggested next implementation order
1. Auth + RBAC + core user models.
2. Service requests + orders.
3. File uploads + secure storage.
4. Stripe payments + webhook verification.
5. Messaging threads.
6. Admin analytics and moderation.

This gives you a maintainable architecture that can launch quickly while still being production-grade.
