import axios, { type AxiosInstance, AxiosError } from "axios";
import { API_CONFIG, API_ENDPOINTS } from "@constants/api";
import { type ApiResponse } from "@/types";

/**
 * Serviço de API centralizado
 * Gerencia todas as chamadas HTTP da aplicação
 */

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({ 
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptador para adicionar token de autenticação
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptador para tratamento de erros
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expirado ou inválido
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET - Buscar dados
   */
  async get<T = any>(
    url: string,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * POST - Criar dados
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PUT - Atualizar dados completos
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PATCH - Atualizar dados parciais
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * DELETE - Remover dados
   */
  async delete<T = any>(
    url: string,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Tratamento centralizado de erros
   */
  private handleError(error: any): ApiResponse<any> {
    const axiosError = error as AxiosError;
    const message = axiosError.response?.data as any;

    console.error("API Error:", error);

    return {
      success: false,
      error: message?.error || "Erro ao conectar com o servidor",
      message: message?.message || axiosError.message,
    };
  }
}

// Exportar instância única do serviço
export const apiService = new ApiService();

/**
 * Endpoints específicos para produtos
 */
export const productService = {
  getAll: async (params?: any) => {
    return apiService.get(API_ENDPOINTS.PRODUCTS, { params });
  },
  getById: async (id: string) => {
    return apiService.get(API_ENDPOINTS.PRODUCT_DETAIL(id));
  },
  getByCategory: async (category: string) => {
    return apiService.get(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
  },
};

/**
 * Endpoints específicos para pedidos
 */
export const orderService = {
  getAll: async () => {
    return apiService.get(API_ENDPOINTS.ORDERS);
  },
  getById: async (id: string) => {
    return apiService.get(API_ENDPOINTS.ORDER_DETAIL(id));
  },
  create: async (data: any) => {
    return apiService.post(API_ENDPOINTS.CREATE_ORDER, data);
  },
};

/**
 * Endpoints específicos para carrinho
 */
export const cartService = {
  getCart: async () => {
    return apiService.get(API_ENDPOINTS.CART);
  },
  addItem: async (productId: string, quantity: number) => {
    return apiService.post(API_ENDPOINTS.ADD_TO_CART, {
      productId,
      quantity,
    });
  },
  removeItem: async (productId: string) => {
    return apiService.delete(API_ENDPOINTS.REMOVE_FROM_CART, {
      data: { productId },
    });
  },
  updateItem: async (productId: string, quantity: number) => {
    return apiService.patch(API_ENDPOINTS.UPDATE_CART_ITEM, {
      productId,
      quantity,
    });
  },
  clear: async () => {
    return apiService.delete(API_ENDPOINTS.CLEAR_CART);
  },
};

/**
 * Endpoints específicos para contato
 */
export const contactService = {
  send: async (data: any) => {
    return apiService.post(API_ENDPOINTS.CONTACT, data);
  },
};

