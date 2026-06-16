/**
 * Página Products
 * Lista de todos os produtos com filtros
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductCard,
  LoadingContainer,
  ErrorMessage,
  EmptyState,
} from "@components/index";
import { productService } from "@services/api";
import { useFetch, usePagination } from "@hooks/index";
import { useAppContext } from "@context/AppContext";
import type { Product } from "@/types";
import { PRODUCT_CATEGORIES } from "@constants/api";

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: products, loading, error, execute } = useFetch<Product[]>([]);
  const { currentPage, totalPages, goToPage } = usePagination(
    products?.length || 0,
    12
  );

  useEffect(() => {
    const filters = {
      ...(selectedCategory && { category: selectedCategory }),
      ...(searchTerm && { search: searchTerm }),
    };
    execute(() => productService.getAll(filters));
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="section-title">Nossos Produtos</h1>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Busca */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nome do produto..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                goToPage(1);
              }}
              className="input-field"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                goToPage(1);
              }}
              className="input-field"
            >
              <option value="">Todas as categorias</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Limpar Filtros */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedCategory("");
                setSearchTerm("");
                goToPage(1);
              }}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <LoadingContainer isLoading={loading}>
        {error ? (
          <ErrorMessage message={error} />
        ) : products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  ← Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-pink-500 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Próximo →
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon="🔍"
            title="Nenhum produto encontrado"
            description="Tente alterar seus filtros ou volte mais tarde"
            action={{
              label: "Limpar Filtros",
              onClick: () => {
                setSelectedCategory("");
                setSearchTerm("");
              },
            }}
          />
        )}
      </LoadingContainer>
    </div>
  );
};

export default Products;

