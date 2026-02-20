export const AUTH_STORAGE_KEY = 'eliteWritingAuth';

export const loadAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

export const saveAuth = (value) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
