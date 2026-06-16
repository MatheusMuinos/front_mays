/**
 * Página Contact
 * Formulário de contato
 */

import React from "react";
import { Button, Input } from "@components/index";
import { useAppContext } from "@context/AppContext";
import { useForm } from "@hooks/index";
import { contactService } from "@services/api";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { addNotification } = useAppContext();

  const initialValues: ContactForm = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } =
    useForm(initialValues);

  const onSubmit = async (formValues: ContactForm) => {
    const response = await contactService.send(formValues);

    if (response.success) {
      addNotification({
        type: "success",
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        duration: 3000,
      });
      reset();
    } else {
      addNotification({
        type: "error",
        message: response.error || "Erro ao enviar mensagem",
        duration: 3000,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="section-title">Entre em Contato</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulário */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Nome"
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
            />

            <Input
              label="Assunto"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.subject ? errors.subject : undefined}
              required
            />

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Sua mensagem..."
                rows={6}
                className="input-field resize-none"
                required
              />
              {touched.message && errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <Button variant="primary" size="large" type="submit">
              📧 Enviar Mensagem
            </Button>
          </form>
        </div>

        {/* Informações */}
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="section-subtitle">Informações de Contato</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Telefone</h4>
                <p className="text-gray-600">(11) 98765-4321</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-600">contato@maysflowers.com</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Endereço</h4>
                <p className="text-gray-600">
                  Rua das Flores, 123<br />
                  São Paulo, SP 01234-567<br />
                  Brasil
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h4>
                <p className="text-gray-600">
                  Segunda a Sexta: 8h - 18h<br />
                  Sábado: 9h - 14h<br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-gray-50 rounded-lg p-8 h-64">
            <p className="text-gray-600 text-center py-20">
              Mapa será integrado aqui
            </p>
          </div>

          {/* Redes Sociais */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="section-subtitle">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="#" className="text-pink-500 hover:text-pink-600 text-2xl">
                📘 Facebook
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-600 text-2xl">
                📷 Instagram
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-600 text-2xl">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

