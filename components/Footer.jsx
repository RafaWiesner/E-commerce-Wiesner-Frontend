import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 text-center">
      <h2 className="text-2xl font mb-4">Fique Conectado!</h2>
      <p className="mb-8 mx-1 text-sm">Siga-nos nas redes sociais e fique por dentro das novidades.</p>
      <div className="flex justify-center mb-8 space-x-6">
        {/* Facebook */}
        <a
          href="https://facebook.com"
          className="text-white hover:text-gray-100 transition duration-300 hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        {/* Instagram */}
        <a
          href="https://instagram.com"
          className="text-white hover:text-gray-100 transition duration-300 hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        {/* Twitter */}
        <a
          href="https://twitter.com"
          className="text-white hover:text-gray-100 transition duration-300 hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faXTwitter} size="2x" />
        </a>
      </div>
      <p className="font-thin text-sm">© 2024 Todos os direitos reservados</p>
    </footer>
  );
};

export default Footer;