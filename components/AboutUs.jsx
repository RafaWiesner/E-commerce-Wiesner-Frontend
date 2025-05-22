import React, { useState } from "react";

const AboutUs = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gray-100 py-1 sm:py-8 text-sm text-gray-700">
      <div className="container mx-auto px-4">
        <div className="md:grid md:grid-cols-4 md:gap-8 lg:mx-16">
          {/* Nossa Empresa */}
          <div className="border-b md:border-none">
            <button
              onClick={() => toggleSection("nossaEmpresa")}
              className="w-full flex justify-between items-center py-4 md:py-0 font-semibold text-gray-800 md:mb-4 focus:outline-none"
            >
              Nossa Empresa
              <span className={`sm:hidden transform ${openSection === "nossaEmpresa" ? "rotate-180" : ""}`}>
                ⌄
              </span>
            </button>
            <ul
              className={`space-y-2 transition-all duration-300 overflow-hidden ${
                openSection === "nossaEmpresa" ? "max-h-screen" : "max-h-0"
              } md:max-h-screen md:space-y-2 mb-2 cursor-pointer`}
            >
              <li className="hover:text-gray-500">Sobre a Wiesner</li>
              <li className="hover:text-gray-500">Sustentabilidade</li>
              <li className="hover:text-gray-500">Trabalhe Conosco</li>
              <li className="hover:text-gray-500">Blog</li>
              <li className="hover:text-gray-500">Canal de Denúncias</li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="border-b md:border-none">
            <button
              onClick={() => toggleSection("atendimento")}
              className="w-full flex justify-between items-center py-4 md:py-0 font-semibold text-gray-800 md:mb-4 focus:outline-none"
            >
              Atendimento
              <span className={`sm:hidden transform ${openSection === "atendimento" ? "rotate-180" : ""}`}>
                ⌄
              </span>
            </button>
            <ul
              className={`space-y-2 transition-all duration-300 overflow-hidden ${
                openSection === "atendimento" ? "max-h-screen" : "max-h-0"
              } md:max-h-screen md:space-y-2 mb-2 cursor-pointer`}
            >
              <li className="hover:text-gray-500">Central de Atendimento</li>
              <li className="hover:text-gray-500">Acompanhe o seu pedido</li>
              <li className="hover:text-gray-500">Whatsapp</li>
              <li className="hover:text-gray-500">Horário de Atendimento</li>
            </ul>
          </div>

          {/* Informações */}
          <div className="border-b md:border-none mb-12 lg:mb-0">
            <button
              onClick={() => toggleSection("informacoes")}
              className="w-full flex justify-between items-center py-4 md:py-0 font-semibold text-gray-800 md:mb-4 focus:outline-none"
            >
              Informações
              <span className={`sm:hidden transform ${openSection === "informacoes" ? "rotate-180" : ""}`}>
                ⌄
              </span>
            </button>
            <ul
              className={`space-y-2 transition-all duration-300 overflow-hidden ${
                openSection === "informacoes" ? "max-h-screen" : "max-h-0"
              } md:max-h-screen md:space-y-2 mb-2 cursor-pointer`}
            >
              <li className="hover:text-gray-500">Política de Garantia</li>
              <li className="hover:text-gray-500">Política de Troca</li>
              <li className="hover:text-gray-500">Política de Consertos</li>
              <li className="hover:text-gray-500">Política de Privacidade</li>
              <li className="hover:text-gray-500">Formas de Pagamento</li>
              <li className="hover:text-gray-500">Cartão Presente</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="border-b md:border-none">
            <h3 className="font-semibold text-gray-800 mb-4">Acompanhe nossas novidades</h3>
            <p className="mb-4">Cadastre seu e-mail para receber informações exclusivas</p>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="E-mail"
                className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring focus:ring-gray-200"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white py-2 rounded hover:opacity-90"
              >
                Cadastrar
              </button>
            </form>
            <p className="text-xs mb-10 text-gray-500 mt-4 lg:mb-0">
              Tendo analisado e compreendido a Política de Privacidade declaro ter mais de 18 anos de idade e aceito receber comunicados de marketing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AboutUs;
