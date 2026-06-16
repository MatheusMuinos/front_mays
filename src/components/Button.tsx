/**
 * Componente Button
 * Botão reutilizável com múltiplas variantes
 */

import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  children,
  disabled,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-pink-500 text-white hover:bg-pink-600",
    secondary: "bg-purple-500 text-white hover:bg-purple-600",
    outline: "border-2 border-pink-500 text-pink-500 hover:bg-pink-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Carregando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

