// src/features/auth/api/authKeys.js

export const authKeys = Object.freeze({
  all: ['auth'],

  session: () => [...authKeys.all, 'session'],
  user: () => [...authKeys.all, 'user'],
  profile: () => [...authKeys.all, 'profile'],

  login: () => [...authKeys.all, 'login'],
  register: () => [...authKeys.all, 'register'],

  emailVerification: () => [...authKeys.all, 'email-verification'],
  passwordReset: () => [...authKeys.all, 'password-reset'],
});