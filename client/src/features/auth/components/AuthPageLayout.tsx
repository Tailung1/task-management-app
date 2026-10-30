import type { ReactNode } from "react";

interface AuthPageLayoutProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  feedback?: {
    message: string;
    type: "error" | "success";
  } | null;
}

export default function AuthPageLayout({
  title,
  children,
  footer,
  feedback,
}: AuthPageLayoutProps) {
  return (
    <main className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm'>
      <section
        role='dialog'
        aria-modal='true'
        aria-labelledby='auth-page-title'
        className='w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl dark:bg-[#2b2c37] sm:p-8'
      >
        <h1 id='auth-page-title' className='sr-only'>
          {title}
        </h1>

        {children}

        {feedback !== undefined && (
          <div className='mt-2 min-h-14'>
            {feedback && (
              <p
                className={`rounded-lg px-3 py-2 text-sm ${
                  feedback.type === "error"
                    ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                    : "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300"
                }`}
                role={feedback.type === "error" ? "alert" : "status"}
                aria-live='polite'
              >
                {feedback.message}
              </p>
            )}
          </div>
        )}

        {footer && <div className='mt-4 text-center text-sm text-[#828fa3]'>{footer}</div>}
      </section>
    </main>
  );
}
