/**
 * Funções utilitárias da aplicação
 */

/**
 * Formata um número como moeda brasileira (R$)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Formata uma data no padrão brasileiro
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Formata uma data e hora no padrão brasileiro
 */
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Trunca um texto com elipsis
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};

/**
 * Valida um email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida um telefone brasileiro
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\d{2})\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

/**
 * Remove caracteres especiais de um CPF/CNPJ
 */
export const cleanDocument = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Formata um CEP
 */
export const formatZipCode = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.replace(/(\d{5})(\d{3})/, "$1-$2");
};

/**
 * Formata um telefone
 */
export const formatPhone = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length <= 10) {
    return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

/**
 * Gera um ID único
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Aguarda um período de tempo (em ms)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Verifica se um valor está em um intervalo de preço
 */
export const isInPriceRange = (
  price: number,
  minPrice: number,
  maxPrice: number
): boolean => {
  return price >= minPrice && price <= maxPrice;
};

/**
 * Calcula o desconto
 */
export const calculateDiscount = (
  originalPrice: number,
  discountPercentage: number
): number => {
  return originalPrice - (originalPrice * discountPercentage) / 100;
};

/**
 * Capitaliza a primeira letra de uma string
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Converte um slug para texto legível
 */
export const slugToText = (slug: string): string => {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

/**
 * Valida se um objeto está vazio
 */
export const isEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Deep clone de um objeto
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Mescla objetos (shallow merge)
 */
export const mergeObjects = <T extends Record<string, any>>(
  ...objects: Partial<T>[]
): T => {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T);
};

