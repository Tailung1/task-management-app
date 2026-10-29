import { useRef, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import type { LoginCredentials, RegisterCredentials } from "../auth.types";
import { login, register } from "../auth.api";
import { ApiError } from "../../../api/clientApi";
import useAuthContext from "../../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthModalProps {
  onClose?: () => void;
}

type AuthMode = "login" | "register";

export default function AuthModal({ onClose }: AuthModalProps) {
  const { setIsAuthenticated } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [loginCredentialsError, setLoginCredentialsError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const initialEmail =
    typeof state === "object" &&
    state !== null &&
    "email" in state &&
    typeof state.email === "string"
      ? state.email
      : "";
  const isForgotPassword = pathname === "/auth/forgot-password";
  const mode: AuthMode = pathname === "/auth/register" ? "register" : "login";

  async function handleLogin(credentials: LoginCredentials) {
    await submitAuthRequest(async () => {
      const data = await login(credentials);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/");
    });
  }

  async function handleRegister(credentials: RegisterCredentials) {
    await submitAuthRequest(async () => {
      await register(credentials);
      setSubmitSuccess("Your account was created. You can now sign in.");
    });
  }

  async function submitAuthRequest(request: () => Promise<void>) {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    setLoginCredentialsError(null);

    try {
      await request();
    } catch (error) {
      if (mode === "login" && error instanceof ApiError && error.status === 401) {
        setLoginCredentialsError("Email or password is incorrect.");
      } else {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        );
      }
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  function handleModeChange() {
    setSubmitError(null);
    setSubmitSuccess(null);
    setLoginCredentialsError(null);
    navigate(mode === "login" ? "/auth/register" : "/auth/login");
  }

  const isLogin = mode === "login";

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm'>
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='auth-modal-title'
        className='relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl dark:bg-[#2b2c37] sm:p-8'
      >
        {onClose && (
          <button
            type='button'
            onClick={onClose}
            disabled={isSubmitting}
            aria-label='Close authentication modal'
            className='absolute right-5 top-5 text-2xl leading-none text-[#828fa3] transition hover:text-[#2b2c37] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-white'
          >
            ×
          </button>
        )}

        <h2 id='auth-modal-title' className='sr-only'>
          {isForgotPassword ? "Reset password" : isLogin ? "Sign in" : "Create account"}
        </h2>

        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            isSubmitting={isSubmitting}
            authenticationError={loginCredentialsError}
            onClearAuthenticationError={() => setLoginCredentialsError(null)}
            initialEmail={initialEmail}
            isForgotPassword={isForgotPassword}
            onForgotPassword={(email) =>
              navigate("/auth/forgot-password", { state: { email } })
            }
            onBackToLogin={(email) =>
              navigate("/auth/login", { state: { email } })
            }
          />
        ) : (
          <RegisterForm onSubmit={handleRegister} isSubmitting={isSubmitting} />
        )}

        <div className='mt-2 min-h-14' aria-live='polite'>
          {submitError && (
            <p
              className='rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300'
              role='alert'
            >
              {submitError}
            </p>
          )}

          {submitSuccess && (
            <p
              className='rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300'
              role='status'
            >
              {submitSuccess}
            </p>
          )}
        </div>

        {!isForgotPassword && (
          <div className='mt-2 text-center text-sm text-[#828fa3]'>
            {isLogin ? "Don't have an account?" : "Already have an account"}{" "}
            <button
              type='button'
              onClick={handleModeChange}
              disabled={isSubmitting}
              className='font-semibold text-[#7230db] transition hover:text-[#5d20bd] disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#a66cff]'
            >
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
