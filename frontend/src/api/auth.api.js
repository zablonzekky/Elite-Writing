import request from './client';

export const register = (payload) => request('/auth/register', { method: 'POST', body: payload });
export const login = (payload) => request('/auth/login', { method: 'POST', body: payload });
export const refreshToken = (payload) => request('/auth/refresh-token', { method: 'POST', body: payload });
