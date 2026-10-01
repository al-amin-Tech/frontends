// src/features/admin/auth/lib/adminStorage.js

const ADMIN_KEYS = {
  ACCESS_TOKEN: 'admin_access_token',
  USER: 'admin_user',
};

export const adminStorage = {
  setAccessToken(token) {
    if (!token) return;
    localStorage.setItem(ADMIN_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken() {
    return localStorage.getItem(ADMIN_KEYS.ACCESS_TOKEN);
  },

  removeAccessToken() {
    localStorage.removeItem(ADMIN_KEYS.ACCESS_TOKEN);
  },

  setUser(user) {
    if (!user) return;
    localStorage.setItem(ADMIN_KEYS.USER, JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(ADMIN_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(ADMIN_KEYS.USER);
  },

  clearAuth() {
    this.removeAccessToken();
    this.removeUser();
  },
};