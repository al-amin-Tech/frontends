import { useState } from "react";
import Input from "../ui/Input";
import { Lock } from 'lucide-react';

export default function PasswordInput({
  label = "Password",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      leftIcon={<Lock size={20} />}
      label={label}
      type={showPassword ? "text" : "password"}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-sm text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      }
    />
  );
}