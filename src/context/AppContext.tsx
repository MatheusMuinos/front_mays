/**
 * Context API para gerenciar estado global da aplicação
 */

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Cart, CartItem, Product } from "@/types";

interface AppContextType {
  // Estado do carrinho
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Notificações
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    totalItems: 0,
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Funções do carrinho
  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.productId === product.id
      );

      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = prevCart.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [
          ...prevCart.items,
          {
            productId: product.id,
            product,
            quantity,
          },
        ];
      }

      return calculateCartTotals(updatedItems);
    });

    addNotification({
      type: "success",
      message: `${product.name} adicionado ao carrinho!`,
      duration: 2000,
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.productId !== productId
      );
      return calculateCartTotals(updatedItems);
    });
  }, []);

  const updateCartItem = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCart((prevCart) => {
        const updatedItems = prevCart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        return calculateCartTotals(updatedItems);
      });
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalPrice: 0,
      totalItems: 0,
    });
  }, []);

  // Funções de notificação
  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = Date.now().toString();
      const newNotification: Notification = {
        ...notification,
        id,
      };

      setNotifications((prev) => [...prev, newNotification]);

      if (notification.duration) {
        setTimeout(() => {
          removeNotification(id);
        }, notification.duration);
      }
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    notifications,
    addNotification,
    removeNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de AppProvider");
  }
  return context;
};

/**
 * Calcula o total do carrinho
 */
function calculateCartTotals(items: CartItem[]): Cart {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    items,
    totalPrice,
    totalItems,
  };
}

