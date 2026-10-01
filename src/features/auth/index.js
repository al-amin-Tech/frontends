// src/features/auth/index.js

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";
export { default as VerifyEmailPage } from "./pages/VerifyEmailPage";
export { default as ForgotPasswordPage } from "./pages/ForgotPasswordPage";
export { default as VerifyPasswordOtpPage } from "./pages/VerifyPasswordOtpPage";
export { default as ResetPasswordPage } from "./pages/ResetPasswordPage";

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
*/
export { default as LoginForm } from "./components/LoginForm";
export { default as RegisterForm } from "./components/RegisterForm";
export { default as VerifyOtpForm } from "./components/VerifyOtpForm";
export { default as ResetPasswordForm } from "./components/ResetPasswordForm";
export { default as PasswordStrength } from "./components/PasswordStrength";

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
*/

export { useAuth } from "./hooks/useAuth";
export { useLogin } from "./hooks/useLogin";
export { useRegister } from "./hooks/useRegister";
export { useLogout } from "./hooks/useLogout";
export { useRefreshToken } from "./hooks/useRefreshToken";
export { useVerifyEmailOtp } from "./hooks/useVerifyEmailOtp";
export { useCompleteEmailVerification } from "./hooks/useCompleteEmailVerification";
export { useRequestPasswordReset } from "./hooks/useRequestPasswordReset";
export { useVerifyPasswordResetOtp } from "./hooks/useVerifyPasswordResetOtp";
export { useCompletePasswordReset } from "./hooks/useCompletePasswordReset";

/*
|--------------------------------------------------------------------------
| Context
|--------------------------------------------------------------------------
*/

export {
  AuthProvider
} from "./context/AuthContext";

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

export { authApi } from "./api/authApi";
export { authKeys } from "./api/authKeys";

/*
|--------------------------------------------------------------------------
| Schemas
|--------------------------------------------------------------------------
*/

export * from "./schemas/auth.schema";