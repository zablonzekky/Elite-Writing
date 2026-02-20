import request from './client';

export const getMyOrders = (token) => request('/orders/me', { token });
export const updateOrderStatus = (id, payload, token) =>
  request(`/orders/${id}/status`, { method: 'PATCH', body: payload, token });
