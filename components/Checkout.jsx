import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const Checkout = ({ total }) => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { user } = state;

  const handleCheckout = () => {
    if (user) {
      navigate('/payment');
    } else {
      // Salva a rota atual para redirecionar após o login
      localStorage.setItem('redirectAfterLogin', '/payment');
      navigate('/login');
    }
  };

  return (
    <div className="p-3 rounded shadow-md text-center lg:w-1/3 border lg:max-h-[133px] lg:mt-4">
      <h2 className="text-2xl font-semibold mb-5 lg:mb-0 text-gray-800 lg:text-lg">Finalizar Compra</h2>
      <p className="text-xl text-gray-600 mb-4 lg:text-base lg:mb-3">Total: R$ {total.toFixed(2)}</p>
      <button 
        onClick={handleCheckout}
        className="w-[160px] bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300 lg:py-1"
      >
        Ir para Pagamento
      </button>
    </div>
  );
};

export default Checkout;
