// src/app/providers.jsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/lib/queryClient";
import { AuthProvider } from "../features/auth/context/AuthContext"; 
import { AdminAuthProvider } from "../features/admin/auth/context/AdminAuthContext"; 
import { ThemeProvider } from "../shared/theme/ThemeProvider"; 

function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
        <AdminAuthProvider>
            {children}
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;

/*
// src/app/providers.jsx

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/lib/queryClient";
import { AuthProvider } from "../features/auth";
import { ThemeProvider } from "../shared/theme/ThemeProvider";

function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;

*/