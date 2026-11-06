import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { getPasswordError } from "../auth.validation";
import FormField from "./FormField";

interface ResetPasswordFormProps {
  onSubmit: (password: string) => Promise<void>;
  isSubmitting: boolean;
  onClearFeedback: () => void;
}

export default function ResetPasswordForm({
  onSubmit,
  isSubmitting,
  onClearFeedback,
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextPasswordError = getPasswordError(password);
    const nextConfirmationError =
      !confirmation ? "Please confirm your new password." :
      confirmation !== password ? "Passwords do not match." :
      "";

    setPasswordError(nextPasswordError ?? "");
    setConfirmationError(nextConfirmationError);

    if (nextPasswordError || nextConfirmationError) return;

    await onSubmit(password);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    setPasswordError("");
    if (confirmation && value !== confirmation) {
      setConfirmationError("Passwords do not match.");
    } else {
      setConfirmationError("");
    }
    onClearFeedback();
  }

  function handleConfirmationChange(value: string) {
    setConfirmation(value);
    setConfirmationError(
      value && value !== password ? "Passwords do not match." : "",
    );
    onClearFeedback();
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-1' noValidate aria-busy={isSubmitting}>
      <FormField
        id='reset-password'
        label='New password'
        type={showPassword ? "text" : "password"}
        placeholder='At least 8 characters'
        autoComplete='new-password'
        value={password}
        error={passwordError}
        icon={LockKeyhole}
        onChange={handlePasswordChange}
        rightElement={
          <button
            type='button'
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-[#828fa3] transition hover:text-[#2b2c37] dark:hover:text-white'
          >
            {showPassword ? (
              <EyeOff size={18} aria-hidden='true' />
            ) : (
              <Eye size={18} aria-hidden='true' />
            )}
          </button>
        }
      />

      <FormField
        id='reset-password-confirmation'
        label='Confirm new password'
        type={showConfirmation ? "text" : "password"}
        placeholder='Re-enter your new password'
        autoComplete='new-password'
        value={confirmation}
        error={confirmationError}
        icon={LockKeyhole}
        onChange={handleConfirmationChange}
        rightElement={
          <button
            type='button'
            onClick={() => setShowConfirmation((value) => !value)}
            aria-label={showConfirmation ? "Hide password" : "Show password"}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-[#828fa3] transition hover:text-[#2b2c37] dark:hover:text-white'
          >
            {showConfirmation ? (
              <EyeOff size={18} aria-hidden='true' />
            ) : (
              <Eye size={18} aria-hidden='true' />
            )}
          </button>
        }
      />

      <button
        type='submit'
        disabled={isSubmitting}
        className='h-12 w-full rounded-xl bg-[#7230db] text-sm font-bold text-white shadow-lg shadow-[#7230db]/20 transition hover:bg-[#6325c4] hover:shadow-[#7230db]/30 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {isSubmitting ? "Updating password..." : "Update password"}
      </button>
    </form>
  );
}
