/**
 * Página Product Detail
 * Detalhes de um produto específico
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, LoadingContainer, ErrorMessage } from "@components/index";
import { productService } from "@services/api";
import { useFetch } from "@hooks/index";
import { useAppContext } from "@context/AppContext";
import type { Product } from "@/types";
import { formatCurrency } from "@utils/index";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  const { data: product, loading, error, execute } = useFetch<Product>();

  useEffect(() => {
    if (id) {
      execute(() => productService.getById(id));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/products")}
        className="text-pink-500 hover:text-pink-600 font-semibold mb-8"
      >
        ← Voltar aos Produtos
      </button>

      <LoadingContainer isLoading={loading}>
        {error ? (
          <ErrorMessage message={error} />
        ) : product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagem */}
            <div className="bg-gray-50 rounded-lg overflow-hidden h-96 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Informações */}
            <div>
              <div className="mb-4">
                <span className="bg-purple-500 text-white">{product.category}</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-2xl">⭐ {product.rating}</span>
                  <span className="text-gray-600 ml-2">
                    ({product.reviews} avaliações)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-lg mb-6">{product.description}</p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2">Preço</p>
                <p className="text-3xl font-bold text-pink-500">
                  {formatCurrency(product.price)}
                </p>
                {product.inStock && (
                  <p className="text-green-600 font-semibold mt-2">
                    ✓ Em estoque
                  </p>
                )}
                {!product.inStock && (
                  <p className="text-red-600 font-semibold mt-2">
                    ✕ Fora de estoque
                  </p>
                )}
              </div>

              {/* Quantidade */}
              {product.inStock && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Quantidade
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="large"
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  🛒 Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  className="flex-1"
                  onClick={() => navigate("/contact")}
                >
                  💬 Fazer Pergunta
                </Button>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-8 border-t pt-8">
                <h3 className="section-subtitle">Informações Adicionais</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>
                    <strong>SKU:</strong> {product.id}
                  </li>
                  <li>
                    <strong>Categoria:</strong> {product.category}
                  </li>
                  <li>
                    <strong>Entrega:</strong> Mesmo dia (pedidos até 12h)
                  </li>
                  <li>
                    <strong>Garantia:</strong> Flores frescas por 3 dias
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </LoadingContainer>
    </div>
  );
};

export default ProductDetail;

