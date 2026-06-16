/**
 * Componente Input
 * Input reutilizável com validação e estados
 */

import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          {label}
          {props.required && <span className="text-red-600"> *</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
            }
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

