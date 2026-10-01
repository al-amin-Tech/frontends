// src/features/admin/auth/context/AdminAuthContext.jsx

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { adminStorage } from "../../../../shared/lib/AdminStorage"; 

export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    try {
      const token = adminStorage.getAccessToken();
      const storedUser = adminStorage.getUser();

      if (token) {
        setAccessToken(token);
        setUser(storedUser);
      }
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const login = useCallback(({ accessToken, user }) => {
    adminStorage.setAccessToken(accessToken);
    adminStorage.setUser(user);
    
    setAccessToken(accessToken);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    adminStorage.clearAuth();
    
    setAccessToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(accessToken);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isInitializing,
      login,
      logout,
      setUser,
      setAccessToken,
    }),
    [user, accessToken, isAuthenticated, isInitializing, login, logout]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}