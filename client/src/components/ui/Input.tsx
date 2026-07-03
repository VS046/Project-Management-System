import React, { forwardRef } from "react";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>

        <input
          ref={ref}
          {...props}
          className={`w-full rounded-lg border px-4 py-3 outline-none transition placeholder:text-slate-400 text-slate-800 ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
          }`}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
