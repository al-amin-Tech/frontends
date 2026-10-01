//AuthContext.jsx

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { storage } from "../../../shared/lib/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  /*
   * Authentication State
   */
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

  /*
   * App initialization state.
   * Prevents ProtectedRoute from redirecting
   * before auth restoration completes.
   */
  const [isInitializing, setIsInitializing] = useState(true);

  /*
   * Restore authentication from storage.
   */
  useEffect(() => {
    try {
      const token = storage.getAccessToken();
      const storedUser = storage.getUser();

      if (token) {
        setAccessToken(token);
        setUser(storedUser);
      }
    } finally {
      setIsInitializing(false);
    }
  }, []);

  /*
   * Login
   */
  const login = useCallback(({ accessToken, user }) => {
    storage.setAccessToken(accessToken);
    storage.setUser(user);

    setAccessToken(accessToken);
    setUser(user);
  }, []);

  /*
   * Logout
   */
  const logout = useCallback(() => {
    storage.clearAuth();

    setAccessToken(null);
    setUser(null);
  }, []);

  /*
   * Derived authentication state.
   */
  const isAuthenticated = Boolean(accessToken);

  const value = useMemo(
    () => ({
      /*
       * State
       */
      user,
      accessToken,

      isAuthenticated,
      isInitializing,

      /*
       * Actions
       */
      login,
      logout,

      /*
       * Optional setters
       * Useful after profile updates
       */
      setUser,
      setAccessToken,
    }),
    [
      user,
      accessToken,
      isAuthenticated,
      isInitializing,
      login,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}






