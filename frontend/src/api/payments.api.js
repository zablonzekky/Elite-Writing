import request from './client';

export const createCheckoutSession = (payload, token) =>
  request('/payments/checkout-session', { method: 'POST', body: payload, token });
