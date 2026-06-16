/**
 * Página Checkout
 * Finalização da compra
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@components/index";
import { useAppContext } from "@context/AppContext";
import { useForm } from "@hooks/index";
import { formatCurrency } from "@utils/index";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart, addNotification } = useAppContext();

  const initialValues: CheckoutForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm(initialValues);

  const onSubmit = async (formValues: CheckoutForm) => {
    // Aqui você integraria com seu backend
    console.log("Pedido enviado:", {
      ...formValues,
      cart: cart.items,
      total: cart.totalPrice,
    });

    addNotification({
      type: "success",
      message: "Pedido realizado com sucesso! Você receberá um email em breve.",
      duration: 3000,
    });

    clearCart();
    setTimeout(() => navigate("/"), 2000);
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600 mb-4">
          Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.
        </p>
        <Button variant="primary" onClick={() => navigate("/products")}>
          Voltar aos Produtos
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="section-title">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Dados Pessoais */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="section-subtitle">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome Completo"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name ? errors.name : undefined}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : undefined}
                  required
                />
                <Input
                  label="Telefone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone ? errors.phone : undefined}
                  required
                />
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="section-subtitle">Endereço de Entrega</h3>
              <div className="space-y-4">
                <Input
                  label="Endereço"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address ? errors.address : undefined}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Cidade"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city ? errors.city : undefined}
                    required
                  />
                  <Input
                    label="Estado"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.state ? errors.state : undefined}
                    required
                  />
                  <Input
                    label="CEP"
                    name="zipCode"
                    value={values.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zipCode ? errors.zipCode : undefined}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="section-subtitle">Informações de Pagamento</h3>
              <div className="space-y-4">
                <Input
                  label="Nome no Cartão"
                  name="cardName"
                  value={values.cardName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardName ? errors.cardName : undefined}
                  required
                />
                <Input
                  label="Número do Cartão"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={values.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardNumber ? errors.cardNumber : undefined}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Validade (MM/YY)"
                    name="cardExpiry"
                    placeholder="12/25"
                    value={values.cardExpiry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.cardExpiry ? errors.cardExpiry : undefined
                    }
                    required
                  />
                  <Input
                    label="CVC"
                    name="cardCVC"
                    placeholder="123"
                    value={values.cardCVC}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cardCVC ? errors.cardCVC : undefined}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/cart")}
              >
                ← Voltar ao Carrinho
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                ✓ Confirmar Pedido
              </Button>
            </div>
          </form>
        </div>

        {/* Resumo */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h3 className="section-subtitle">Resumo da Compra</h3>

            <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">Grátis</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-pink-500">
                {formatCurrency(cart.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

