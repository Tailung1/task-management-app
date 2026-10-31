import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthPageLayout from "../components/AuthPageLayout";
import RegisterForm from "../components/RegisterForm";
import { register } from "../auth.api";
import type { RegisterCredentials } from "../auth.types";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  async function handleRegister(credentials: RegisterCredentials) {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await register(credentials);
      setSubmitSuccess("Your account was created. You can now sign in.");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageLayout
      title='Create account'
      feedback={
        submitError
          ? { message: submitError, type: "error" }
          : submitSuccess
            ? { message: submitSuccess, type: "success" }
            : null
      }
      footer={
        <>
          Already have an account?{" "}
          <Link
            to='/auth/login'
            className='font-semibold text-[#7230db] transition hover:text-[#5d20bd] dark:text-[#a66cff]'
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm
        onSubmit={handleRegister}
        isSubmitting={isSubmitting}
        onClearFeedback={() => setSubmitError(null)}
      />
    </AuthPageLayout>
  );
}
