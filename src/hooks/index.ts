/**
 * Hooks customizados da aplicação
 */

import { useState, useCallback } from "react";
import { type ApiResponse } from "@/types";
import React from "react";

/**
 * Hook para fazer requisições HTTP com estado de carregamento e erro
 */
export const useFetch = <T = any>(initialData?: T) => {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (
      apiCall: () => Promise<ApiResponse<T>>,
      onSuccess?: (data: T) => void,
      onError?: (error: string) => void
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiCall();
        if (response.success && response.data) {
          setData(response.data);
          onSuccess?.(response.data);
        } else {
          const errorMsg = response.error || "Erro ao carregar dados";
          setError(errorMsg);
          onError?.(errorMsg);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMsg);
        onError?.(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

/**
 * Hook para gerenciar estado de formulário
 */
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const inputValue =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value;

      setValues((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (
      callback: (values: T) => void | Promise<void>,
      validationRules?: Partial<Record<keyof T, (value: any) => string | void>>
    ) => {
      return async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar valores
        const newErrors: Partial<Record<keyof T, string>> = {};
        if (validationRules) {
          Object.keys(validationRules).forEach((key) => {
            const rule = validationRules[key as keyof T];
            if (rule) {
              const error = rule(values[key as keyof T]);
              if (error) {
                newErrors[key as keyof T] = error;
              }
            }
          });
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          await callback(values);
        }
      };
    },
    [values]
  );

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
  };
};

/**
 * Hook para gerenciar estado local com persistência em localStorage
 */
export const useLocalStorage = <T = any>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

/**
 * Hook para detectar clicks fora de um elemento
 */
export const useClickOutside = (ref: React.RefObject<HTMLElement>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [ref]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  return [isOpen, setIsOpen] as const;
};

/**
 * Hook para gerenciar paginação
 */
export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
};

export default {
  useFetch,
  useForm,
  useLocalStorage,
  useClickOutside,
  usePagination,
};

