import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiError } from "../../../api/clientApi";
import useAuthContext from "../../../contexts/AuthContext";
import { login } from "../auth.api";
import type { LoginCredentials } from "../auth.types";
import AuthPageLayout from "../components/AuthPageLayout";
import LoginForm from "../components/LoginForm";

function getReturnPath(state: unknown): string {
  if (
    typeof state !== "object" ||
    state === null ||
    !("from" in state) ||
    typeof state.from !== "object" ||
    state.from === null ||
    !("pathname" in state.from) ||
    typeof state.from.pathname !== "string" ||
    !state.from.pathname.startsWith("/") ||
    state.from.pathname.startsWith("//")
  ) {
    return "/";
  }

  const search =
    "search" in state.from && typeof state.from.search === "string" ? state.from.search : "";
  const hash =
    "hash" in state.from && typeof state.from.hash === "string" ? state.from.hash : "";

  return `${state.from.pathname}${search}${hash}`;
}

export default function LoginPage() {
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [credentialsError, setCredentialsError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const initialEmail =
    typeof location.state === "object" &&
    location.state !== null &&
    "email" in location.state &&
    typeof location.state.email === "string"
      ? location.state.email
      : "";

  async function handleLogin(credentials: LoginCredentials) {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    setCredentialsError(null);

    try {
      const data = await login(credentials);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate(getReturnPath(location.state), { replace: true });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setCredentialsError("Email or password is incorrect.");
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

  return (
    <AuthPageLayout
      title='Sign in'
      feedback={submitError ? { message: submitError, type: "error" } : null}
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to='/auth/register'
            className='font-semibold text-[#7230db] transition hover:text-[#5d20bd] dark:text-[#a66cff]'
          >
            Create account
          </Link>
        </>
      }
    >
      <LoginForm
        onSubmit={handleLogin}
        isSubmitting={isSubmitting}
        authenticationError={credentialsError}
        onClearFeedback={() => {
          setSubmitError(null);
          setCredentialsError(null);
        }}
        initialEmail={initialEmail}
        onForgotPassword={(email) =>
          navigate("/auth/forgot-password", { state: { email } })
        }
      />
    </AuthPageLayout>
  );
}
