// src/features/auth/pages/LoginPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { useLogin } from "../hooks/useLogin";
import ROUTES from "../../../shared/constants/routes";
import {
  Alert
} from "../../../shared/components/ui";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, login } = useAuth();
  const loginMutation = useLogin();
  
   useEffect(() => {
    if (isAuthenticated && user) {
      navigate(ROUTES.DASHBOARD, {
        replace: true,
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginSuccess = async (loginValues) => {
  if (loginValues.action === "forgot-password") {
    navigate(ROUTES.FORGOT_PASSWORD);
    return;
  }

  try {
    const data  = await loginMutation.mutateAsync(loginValues);

    if (data?.requireVerification) {
      navigate(ROUTES.VERIFY_EMAIL, {
        replace: true,
        state: {
          email: data.email,
        },
      });
      return;
    }
  if(data?.access_token && data?.user){
    
   login({
    accessToken: data.access_token,
    user: data.user,
   });

    navigate(ROUTES.DASHBOARD, {
      replace: true,
      state: {
        from: location.state?.from,
      },
    });
    return;
  }
  } catch (error) {
    await Alert({
      type: "error",
      title: "Login Failed",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Login Failed",
    });

    loginMutation.reset();
  }
};

  return (
    <div className="mx-auto w-full max-w-md">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-500">
          Sign in to access your account.
        </p>

      </div>

      <LoginForm
          mutation={loginMutation}
        onSuccess={handleLoginSuccess}
      />

      <div className="mt-8 space-y-3 text-center">

        <p className="text-sm text-gray-600">
          Don't have an account?
        </p>

        <Link
          to="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Create Account
        </Link>

        <div>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

      </div>

    </div>
  );
}

