/**
 * Componente Notification
 * Sistema de notificações toast
 */

import React, { useEffect } from "react";
import type { Notification } from "@context/AppContext";

interface NotificationItemProps extends Notification {
  onClose: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  type,
  message,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
    info: "bg-blue-600",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className={`${typeClasses[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideInUp`}>
      <span className="text-lg font-bold">{icons[type]}</span>
      <p>{message}</p>
      <button
        onClick={() => onClose(id)}
        className="ml-auto text-lg hover:opacity-70"
      >
        ✕
      </button>
    </div>
  );
};

export const NotificationContainer: React.FC<{
  notifications: Notification[];
  onClose: (id: string) => void;
}> = ({ notifications, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default NotificationItem;

