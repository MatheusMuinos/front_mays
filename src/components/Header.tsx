/**
 * Componente Header
 * Navegação principal da aplicação
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@context/AppContext";
// import Button from "./Button";

export const Header: React.FC = () => {
  const { cart } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { label: "Início", path: "/" },
    { label: "Produtos", path: "/products" },
    { label: "Sobre", path: "/about" },
    { label: "Contato", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-500 hover:text-pink-600 transition-colors"
        >
          🌸 May's Flowers
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-900 hover:text-pink-500 font-semibold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Ícones e Carrinho */}
        <div className="flex items-center gap-4">
          {/* Carrinho */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            🛒 Carrinho
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cart.totalItems}
              </span>
            )}
          </Link>

          {/* Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-900 text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Menu Mobile Expandido */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-4">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2 text-gray-900 hover:text-pink-500 font-semibold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

