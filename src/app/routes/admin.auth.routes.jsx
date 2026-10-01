// src/app/routes/admin.routes.jsx
// TODO: Adjust paths to match your exact project structure
import { Route, Navigate } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "../../shared/constants/routes";
import AuthLayout from "../../shared/components/layout/AuthLayout";

import {AdminLoginPage,
  AdminVerifyTotpPage,
  VerifyEmailPage,
  ForgotPasswordPage,
  VerifyPasswordOtpPage,
  ResetPasswordPage, } from "../../features/admin/auth";
  
const adminauthRoutes = (
  <>
    <Route
      path={ROUTES.ROOT}
      element={<Navigate to={ROUTES.LOGIN} replace />}
    />
    <Route element={<AuthLayout />}>
    {/* 1. Admin Auth Routes (No Layout, No Guard - Public to the admin portal) */}
    <Route path={ADMIN_ROUTES.LOGIN} element={<AdminLoginPage />} />
    <Route path={ADMIN_ROUTES.VERIFY_TOTP} element={<AdminVerifyTotpPage />} />
    
    <Route
          path={ADMIN_ROUTES.VERIFY_EMAIL}
          element={<VerifyEmailPage />}
        />

        <Route
          path={ADMIN_ROUTES.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />

        <Route
          path={ADMIN_ROUTES.VERIFY_PASSWORD_OTP}
          element={<VerifyPasswordOtpPage />}
        />

        <Route
          path={ADMIN_ROUTES.RESET_PASSWORD}
          element={<ResetPasswordPage />}
        />
        
   </Route>
  </>
);

export default adminauthRoutes;