// src/shared/lib/storage.js

const KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER: 'user',
};

export const storage = {
  setAccessToken(token) {
    if (!token) return;
    localStorage.setItem(KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken() {
    return localStorage.getItem(KEYS.ACCESS_TOKEN);
  },

  removeAccessToken() {
    localStorage.removeItem(KEYS.ACCESS_TOKEN);
  },

  setUser(user) {
    if (!user) return;
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(KEYS.USER);
  },

  clearAuth() {
    this.removeAccessToken();
    this.removeUser();
  },
};