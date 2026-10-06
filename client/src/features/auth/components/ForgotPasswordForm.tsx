import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import FormField from "./FormField";

interface ForgotPasswordFormProps {
  initialEmail: string;
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({
  initialEmail,
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [resetError, setResetError] = useState("");

  function handleResetSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!resetEmail.trim()) {
      setResetError("Please enter your email address.");
      return;
    }

    setResetError("");
  }

  function handleEmailChange(value: string) {
    setResetEmail(value);

    if (resetError) {
      setResetError("");
    }
  }

  return (
    <form onSubmit={handleResetSubmit} className='space-y-1' noValidate>
      <button
        type='button'
        onClick={onBackToLogin}
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
        value={resetEmail}
        error={resetError}
        icon={Mail}
        onChange={handleEmailChange}
      />

      <button
        type='submit'
        className='h-12 w-full rounded-xl bg-[#7230db] text-sm font-bold text-white shadow-lg shadow-[#7230db]/20 transition hover:bg-[#6325c4] hover:shadow-[#7230db]/30 active:scale-[0.99]'
      >
        Send reset link
      </button>
    </form>
  );
}
