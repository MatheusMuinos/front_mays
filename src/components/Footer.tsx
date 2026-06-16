/**
 * Componente Footer
 * Rodapé da aplicação com informações e links
 */

import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Sobre",
      links: [
        { label: "Quem Somos", path: "/about" },
        { label: "Blog", path: "/blog" },
        { label: "Careers", path: "/careers" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Contato", path: "/contact" },
        { label: "FAQ", path: "/faq" },
        { label: "Rastrear Pedido", path: "/track-order" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Política de Privacidade", path: "/privacy" },
        { label: "Termos de Serviço", path: "/terms" },
        { label: "Política de Devolução", path: "/returns" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid de seções */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Info da empresa */}
          <div>
            <h3 className="text-xl font-bold text-pink-500 mb-4">🌸 May's Flowers</h3>
            <p className="text-gray-400 mb-4">
              Flores frescas e arranjos lindos para suas ocasiões especiais.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-pink-500 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                📘 Facebook
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                📷 Instagram
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-accent transition-colors"
                aria-label="WhatsApp"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Newsletter */}
          <div className="mb-8">
            <h4 className="font-semibold text-white mb-4">
              Inscreva-se em nossa newsletter
            </h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-2 bg-gray-800 text-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {currentYear} May's Flowers. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Desenvolvido com 💕 por May's Flowers Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

