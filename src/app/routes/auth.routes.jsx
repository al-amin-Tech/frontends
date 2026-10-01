import { Route, Navigate } from "react-router-dom";

import ROUTES from "../../shared/constants/routes";
import GuestRoute from "../../shared/components/guards/GuestRoute";
import AuthLayout from "../../shared/components/layout/AuthLayout";

import {
  LoginPage,
  RegisterPage,
  VerifyEmailPage,
  ForgotPasswordPage,
  VerifyPasswordOtpPage,
  ResetPasswordPage,
} from "../../features/auth";

const authRoutes = (
  <>
    <Route
      path={ROUTES.ROOT}
      element={<Navigate to={ROUTES.LOGIN} replace />}
    />

     <Route element={<GuestRoute />}>
     <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route
          path={ROUTES.REGISTER}
          element={<RegisterPage />}
        />

        <Route
          path={ROUTES.VERIFY_EMAIL}
          element={<VerifyEmailPage />}
        />

        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />

        <Route
          path={ROUTES.VERIFY_PASSWORD_OTP}
          element={<VerifyPasswordOtpPage />}
        />

        <Route
          path={ROUTES.RESET_PASSWORD}
          element={<ResetPasswordPage />}
        />
        
      </Route>
      </Route>
  </>
);

export default authRoutes;
