/**
 * Componente App
 * Roteamento e estrutura principal da aplicação
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider, useAppContext } from "@context/AppContext";
import { Header, Footer, NotificationContainer } from "@components/index";
import {
  Home,
  Products,
  ProductDetail,
  Cart,
  Checkout,
  Contact,
  NotFound,
} from "@pages/index";
import "@styles/index.css";

const AppRoutes: React.FC = () => {
  const { notifications, removeNotification } = useAppContext();

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-180px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
};

export default App;

