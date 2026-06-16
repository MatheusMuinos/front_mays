/**
 * Página Cart
 * Exibir e gerenciar carrinho de compras
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, EmptyState } from "@components/index";
import { useAppContext } from "@context/AppContext";
import { formatCurrency } from "@utils/index";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItem, clearCart } = useAppContext();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16"> 
        <EmptyState
          icon="🛒"
          title="Carrinho Vazio"
          description="Parece que você ainda não adicionou nenhum produto ao carrinho"
          action={{
            label: "Continuar Comprando",
            onClick: () => navigate("/products"),
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="section-title">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itens */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Produto</th>
                  <th className="px-6 py-4 text-left font-semibold">Preço</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Quantidade
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Subtotal
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Ação</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.productId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.product.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(item.product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {formatCurrency(
                        item.product.price * item.quantity
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        ✕ Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/products")}
            >
              ← Continuar Comprando
            </Button>
            <Button
              variant="danger"
              onClick={clearCart}
            >
              🗑️ Limpar Carrinho
            </Button>
          </div>
        </div>

        {/* Resumo */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h3 className="section-subtitle">Resumo do Pedido</h3>

            <div className="space-y-4 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.totalItems} itens)</span>
                <span>{formatCurrency(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">Grátis</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Desconto</span>
                <span>R$ 0,00</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-xl font-bold">
              <span>Total</span>
              <span className="text-pink-500">
                {formatCurrency(cart.totalPrice)}
              </span>
            </div>

            <Button
              variant="primary"
              size="large"
              className="w-full"
              onClick={() => navigate("/checkout")}
            >
              Ir para Checkout
            </Button>

            <p className="text-gray-600 text-xs mt-4 text-center">
              Você pode editar o carrinho até o checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

