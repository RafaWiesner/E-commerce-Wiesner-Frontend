import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Pedido realizado com sucesso!</h1>
        <p className="text-lg text-gray-700 mb-2">Obrigado por sua compra.</p>
        {orderId && (
          <p className="text-gray-600 mb-4">Número do pedido: <span className="font-semibold">#{orderId}</span></p>
        )}
        <button
          onClick={() => navigate('/perfil')}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Ver meus pedidos
        </button>
      </div>
    </div>
  );
} 