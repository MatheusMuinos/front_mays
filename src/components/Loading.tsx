/**
 * Componentes Loading e Error
 */

import React from "react";

/**
 * Spinner de carregamento
 */
export const LoadingSpinner: React.FC<{ size?: "small" | "medium" | "large" }> =
  ({ size = "medium" }) => {
    const sizeClasses = {
      small: "h-4 w-4",
      medium: "h-8 w-8",
      large: "h-12 w-12",
    };

    return (
      <div className="flex items-center justify-center">
        <svg
          className={`animate-spin text-pink-500 ${sizeClasses[size]}`}
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
      </div>
    );
  };

/**
 * Container de carregamento
 */
export const LoadingContainer: React.FC<{ isLoading: boolean; children: React.ReactNode }> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Mensagem de erro
 */
export const ErrorMessage: React.FC<{
  message: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-600 font-semibold mb-4">❌ {message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
};

/**
 * Estado vazio
 */
export const EmptyState: React.FC<{
  icon?: string;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}> = ({ icon = "📭", title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-6xl mb-4">{icon}</p>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default {
  LoadingSpinner,
  LoadingContainer,
  ErrorMessage,
  EmptyState,
};

