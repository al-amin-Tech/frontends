// src/features/auth/pages/RegisterPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import ROUTES from "../../../shared/constants/routes";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    /*
      Backend Flow

      POST /auth/register

      Response:
      "User registered. Please verify your account by login."

      User must login next.
    */

    navigate(ROUTES.LOGIN, {
      replace: true,
      state: {
        registrationSuccess: true,
      },
    });
  };
//   <div className="mx-auto w-full max-w-2xl">
  return (
    <div className="w-full max-w-2xl">
 

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-gray-500">
          Create your account to start using our services.
        </p>

      </div>

      <RegisterForm
        onSuccess={handleRegisterSuccess}
      />

      <div className="mt-8 text-center">

        <p className="text-sm text-gray-600">
          Already have an account?
        </p>

        <Link
          to="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign In
        </Link>

      </div>

    </div>
  );
}