import { AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  icon: LucideIcon;
  onChange: (value: string) => void;
  rightElement?: ReactNode;
}

export default function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  error,
  icon: Icon,
  onChange,
  rightElement,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-semibold text-[#2b2c37] dark:text-white'
      >
        {label}
      </label>

      <div className='relative'>
        <Icon
          size={18}
          aria-hidden='true'
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${
            error ? "text-red-500" : "text-[#828fa3]"
          }`}
        />

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-xl border bg-white pl-11 ${
            rightElement ? "pr-12" : "pr-4"
          } text-sm text-[#2b2c37] outline-none transition placeholder:text-[#828fa3] dark:bg-[#2b2c37] dark:text-white ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/15"
              : "border-[#dfe3e8] focus:border-[#7230db] focus:ring-2 focus:ring-[#7230db]/15 dark:border-[#3e3f4e] dark:focus:border-[#a66cff]"
          }`}
        />

        {rightElement}
      </div>

      <div className='mt-2 h-5'>
        <p
          id={errorId}
          className={`flex items-center gap-1.5 text-xs font-medium text-red-500 transition-all duration-200 ${
            error ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
          aria-hidden={!error}
        >
          <AlertCircle size={14} aria-hidden='true' />
          {error || "\u00A0"}
        </p>
      </div>
    </div>
  );
}
