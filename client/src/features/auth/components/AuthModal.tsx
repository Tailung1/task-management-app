import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import type { LoginCredentials, RegisterCredentials } from "../auth.types";

interface AuthModalProps {
  onClose?: () => void;
}

type AuthMode = "login" | "register";

export default function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");

  function handleLogin(credentials: LoginCredentials) {}

  function handleRegister(credentials: RegisterCredentials) {}

  function handleModeChange() {
    setMode((current) => (current === "login" ? "register" : "login"));
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
            aria-label='Close authentication modal'
            className='absolute right-5 top-5 text-2xl leading-none text-[#828fa3] transition hover:text-[#2b2c37] dark:hover:text-white'
          >
            ×
          </button>
        )}

        <h2 id='auth-modal-title' className='sr-only'>
          {isLogin ? "Sign in" : "Create account"}
        </h2>

        {isLogin ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}

        <div className='mt-6 text-center text-sm text-[#828fa3]'>
          {isLogin ? "Don't have an account?" : "Already have an account"}{" "}
          <button
            type='button'
            onClick={handleModeChange}
            className='font-semibold text-[#7230db] transition hover:text-[#5d20bd] dark:text-[#a66cff]'
          >
            {isLogin ? "Create account" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
