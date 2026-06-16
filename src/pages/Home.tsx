/**
 * Página Home
 * Página inicial da aplicação
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard, LoadingContainer, ErrorMessage, EmptyState } from "@components/index";
import { productService } from "@services/api";
import { useFetch } from "@hooks/index";
import { useAppContext } from "@context/AppContext";
import type{ Product } from "@/types";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const { data: products, loading, error, execute } = useFetch<Product[]>([]);

  useEffect(() => {
    execute(() => productService.getAll({ limit: 6 }));
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            🌸 Bem-vindo à May's Flowers
          </h1>
          <p className="text-xl mb-8">
            Flores frescas e arranjos lindos para suas ocasiões especiais
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-pink-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Explorar Produtos
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title">Produtos em Destaque</h2>

        <LoadingContainer isLoading={loading}>
          {error ? (
            <ErrorMessage message={error} />
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🌸"
              title="Nenhum produto encontrado"
              description="Volte mais tarde para ver nossos produtos lindos"
              action={{
                label: "Voltar",
                onClick: () => navigate("/"),
              }}
            />
          )}
        </LoadingContainer>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Por que escolher a May's Flowers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl mb-4">🌺</p>
              <h3 className="section-subtitle">Flores Frescas</h3>
              <p className="text-gray-600">
                Selecionamos apenas as melhores flores direto do fornecedor
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-4">🚚</p>
              <h3 className="section-subtitle">Entrega Rápida</h3>
              <p className="text-gray-600">
                Entrega no mesmo dia para pedidos feitos até as 12h
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-4">💝</p>
              <h3 className="section-subtitle">Personalização</h3>
              <p className="text-gray-600">
                Personalize seus buquês com mensagens e embalagens especiais
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

