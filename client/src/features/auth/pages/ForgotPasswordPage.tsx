import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../auth.api";
import AuthPageLayout from "../components/AuthPageLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const initialEmail =
    typeof location.state === "object" &&
    location.state !== null &&
    "email" in location.state &&
    typeof location.state.email === "string"
      ? location.state.email
      : "";

  async function handleSubmit(email: string) {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await requestPasswordReset(email);
      setSubmitSuccess(
        "If an account exists for that email, a password reset link will be sent.",
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to process the password reset request.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageLayout
      title='Reset password'
      feedback={
        submitError
          ? { message: submitError, type: "error" }
          : submitSuccess
            ? { message: submitSuccess, type: "success" }
            : null
      }
    >
      <ForgotPasswordForm
        initialEmail={initialEmail}
        onBackToLogin={(email) => navigate("/auth/login", { state: { email } })}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onClearFeedback={() => {
          setSubmitError(null);
          setSubmitSuccess(null);
        }}
      />
    </AuthPageLayout>
  );
}
