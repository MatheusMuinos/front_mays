/**
 * Componente ProductCard
 * Card para exibir informações do produto
 */

import React from "react";
import type { Product } from "@/types";
import { formatCurrency, truncateText } from "@utils/index";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Imagem do produto */}
      <div className="relative bg-gray-50 h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />

        {/* Badge de status */}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Fora de estoque
          </div>
        )}

        {product.rating > 4 && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            ⭐ {product.rating}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Categoria */}
        <p className="text-xs uppercase font-semibold text-purple-500 mb-2">
          {product.category}
        </p>

        {/* Nome do produto */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {truncateText(product.name, 40)}
        </h3>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-3">
          {truncateText(product.description, 60)}
        </p>

        {/* Avaliações */}
        <div className="flex items-center gap-1 mb-3 text-sm text-gray-500">
          <span>({product.reviews} avaliações)</span>
        </div>

        {/* Preço */}
        <div className="mb-4 pb-4 border-b">
          <p className="text-2xl font-bold text-pink-500">
            {formatCurrency(product.price)}
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="small"
            className="flex-1"
            onClick={() => onViewDetails?.(product.id)}
          >
            Detalhes
          </Button>

          <Button
            variant="primary"
            size="small"
            className="flex-1"
            disabled={!product.inStock}
            onClick={() => onAddToCart?.(product)}
          >
            {product.inStock ? "Adicionar" : "Indisponível"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

