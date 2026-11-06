import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../auth.api";
import AuthPageLayout from "../components/AuthPageLayout";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token] = useState(() => searchParams.get("token") ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (token) {
      navigate("/auth/reset-password", { replace: true });
    }
  }, [navigate, token]);

  async function handleSubmit(password: string) {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await resetPassword(token, password);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to reset the password.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageLayout
      title='Choose a new password'
      feedback={
        submitError
          ? { message: submitError, type: "error" }
          : submitSuccess
            ? {
                message: "Your password was reset. Sign in with your new password.",
                type: "success",
              }
            : null
      }
      footer={
        submitSuccess ? (
          <Link
            to='/auth/login'
            className='font-semibold text-[#7230db] transition hover:text-[#5d20bd] dark:text-[#a66cff]'
          >
            Back to sign in
          </Link>
        ) : (
          <Link
            to='/auth/forgot-password'
            className='font-semibold text-[#7230db] transition hover:text-[#5d20bd] dark:text-[#a66cff]'
          >
            Request a new reset link
          </Link>
        )
      }
    >
      {!token ? (
        <p className='text-sm text-[#828fa3]'>
          This reset link is invalid or has expired. Request a new link to continue.
        </p>
      ) : submitSuccess ? null : (
        <ResetPasswordForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onClearFeedback={() => setSubmitError(null)}
        />
      )}
    </AuthPageLayout>
  );
}
