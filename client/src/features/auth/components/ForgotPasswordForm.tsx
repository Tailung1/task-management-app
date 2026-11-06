import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { getEmailError } from "../auth.validation";
import FormField from "./FormField";

interface ForgotPasswordFormProps {
  initialEmail: string;
  onBackToLogin: (email: string) => void;
  onSubmit: (email: string) => Promise<void>;
  isSubmitting: boolean;
  onClearFeedback: () => void;
}

export default function ForgotPasswordForm({
  initialEmail,
  onBackToLogin,
  onSubmit,
  isSubmitting,
  onClearFeedback,
}: ForgotPasswordFormProps) {
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [resetError, setResetError] = useState("");

  async function handleResetSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailError = getEmailError(resetEmail);
    if (emailError) {
      setResetError(emailError);
      return;
    }

    setResetError("");
    await onSubmit(resetEmail.trim());
  }

  function handleEmailChange(value: string) {
    setResetEmail(value);

    if (resetError) {
      setResetError("");
    }
    onClearFeedback();
  }

  return (
    <form
      onSubmit={handleResetSubmit}
      className='space-y-1'
      noValidate
      aria-busy={isSubmitting}
    >
      <button
        type='button'
        onClick={() => onBackToLogin(resetEmail)}
        className='flex items-center gap-2 mb-5  text-sm font-semibold text-[#828fa3] transition hover:text-[#2b2c37] dark:hover:text-white'
      >
        <ArrowLeft size={16} aria-hidden='true' />
        Back to sign in
      </button>

      <FormField
        id='reset-email'
        label='Email'
        type='email'
        placeholder='you@example.com'
        autoComplete='email'
        maxLength={254}
        value={resetEmail}
        error={resetError}
        icon={Mail}
        onChange={handleEmailChange}
      />

      <button
        type='submit'
        disabled={isSubmitting}
        className='h-12 w-full rounded-xl bg-[#7230db] text-sm font-bold text-white shadow-lg shadow-[#7230db]/20 transition hover:bg-[#6325c4] hover:shadow-[#7230db]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60'
      >
        {isSubmitting ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
