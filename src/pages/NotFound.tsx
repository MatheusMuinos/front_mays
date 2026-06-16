/**
 * Página NotFound
 * Página de erro 404
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/index";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-pink-500 mb-4">404</div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Página Não Encontrada
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>

        <div className="space-y-4">
          <p className="text-gray-600">
            Aqui estão algumas opções úteis:
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={() => navigate("/")}>
              🏠 Ir para Início
            </Button>

            <Button variant="secondary" onClick={() => navigate("/products")}>
              🛍️ Ver Produtos
            </Button>

            <Button variant="outline" onClick={() => navigate(-1)}>
              ← Voltar
            </Button>
          </div>
        </div>

        <div className="mt-16 text-8xl">🌸</div>
      </div>
    </div>
  );
};

export default NotFound;

