/**
 * Constantes da aplicação
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000"),
};

export const APP_NAME = import.meta.env.VITE_APP_NAME || "May's Flowers";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

/**
 * Endpoints da API
 */
export const API_ENDPOINTS = {
  // Produtos
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products?category=${category}`,

  // Carrinho
  CART: "/cart",
  ADD_TO_CART: "/cart/add",
  REMOVE_FROM_CART: "/cart/remove",
  UPDATE_CART_ITEM: "/cart/update",
  CLEAR_CART: "/cart/clear",

  // Pedidos
  ORDERS: "/orders",
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  CREATE_ORDER: "/orders",

  // Autenticação
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  PROFILE: "/auth/profile",

  // Contato
  CONTACT: "/contact",
};

export const PRODUCT_CATEGORIES = [
  "Buquês",
  "Arranjos",
  "Plantas",
  "Cestas",
  "Ocasiões Especiais",
];

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const ORDER_STATUS_LABELS = {
  pending: "Pendente",
  processing: "Processando",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

