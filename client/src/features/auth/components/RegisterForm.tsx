import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import type { RegisterCredentials } from "../auth.types";
import FormField from "./FormField";

interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => void;
}

type RegisterField = "name" | "email" | "password";

type FormErrors = Partial<Record<RegisterField, string>>;

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Please create a password.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      password,
    });
  }

  function handleInputChange(field: RegisterField, value: string) {
    if (field === "name") {
      setName(value);
    } else if (field === "email") {
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
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-1' noValidate>
      <FormField
        id='register-name'
        label='Full name'
        type='text'
        placeholder='John Doe'
        value={name}
        error={errors.name}
        icon={UserRound}
        onChange={(value) => handleInputChange("name", value)}
      />

      <FormField
        id='register-email'
        label='Email'
        type='email'
        placeholder='you@example.com'
        value={email}
        error={errors.email}
        icon={Mail}
        onChange={(value) => handleInputChange("email", value)}
      />

      <FormField
        id='register-password'
        label='Password'
        type={showPassword ? "text" : "password"}
        placeholder='Create a password'
        value={password}
        error={errors.password}
        icon={LockKeyhole}
        onChange={(value) => handleInputChange("password", value)}
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

      <button
        type='submit'
        className='h-12 w-full rounded-xl bg-[#7230db] text-sm font-bold text-white shadow-lg shadow-[#7230db]/20 transition hover:bg-[#6325c4] hover:shadow-[#7230db]/30'
      >
        Create account
      </button>
    </form>
  );
}
