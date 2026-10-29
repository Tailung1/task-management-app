import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import type { LoginCredentials } from "../auth.types";
import { getEmailError, getPasswordError } from "../auth.validation";
import FormField from "./FormField";

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isSubmitting: boolean;
  authenticationError: string | null;
  onClearAuthenticationError: () => void;
  initialEmail: string;
  onForgotPassword: (email: string) => void;
}

type LoginField = keyof LoginCredentials;
type FormErrors = Partial<Record<LoginField, string>>;

export default function LoginForm({
  onSubmit,
  isSubmitting,
  authenticationError,
  onClearAuthenticationError,
  initialEmail,
  onForgotPassword,
}: LoginFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password, false);
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    await onSubmit({
      email: email.trim(),
      password,
    });
  }

  function handleInputChange(field: LoginField, value: string) {
    if (field === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }

    onClearAuthenticationError();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-1" noValidate aria-busy={isSubmitting}>
      <FormField
        id="login-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        maxLength={254}
        value={email}
        error={errors.email}
        icon={Mail}
        onChange={(value) => handleInputChange("email", value)}
      />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="block text-sm font-semibold text-[#2b2c37] dark:text-white"
          >
            Password
          </label>

          <button
            type="button"
            onClick={() => onForgotPassword(email)}
            className="text-xs font-semibold text-[#7230db] transition hover:text-[#5d20bd] dark:text-[#a66cff]"
          >
            Forgot password?
          </button>
        </div>

        <div className="-mt-2">
          <FormField
            id="login-password"
            label=""
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            error={errors.password ?? authenticationError ?? undefined}
            icon={LockKeyhole}
            onChange={(value) => handleInputChange("password", value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#828fa3] transition hover:text-[#2b2c37] dark:hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            }
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl bg-[#7230db] text-sm font-bold text-white shadow-lg shadow-[#7230db]/20 transition hover:bg-[#6325c4] hover:shadow-[#7230db]/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
