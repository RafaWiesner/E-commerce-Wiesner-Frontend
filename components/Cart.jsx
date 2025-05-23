import React from "react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi"; // Importação de ícones
import { useApp } from "../context/AppContext.jsx";

const Cart = () => {
  const { state, dispatch } = useApp();
  const { cart } = state;

  const handleIncrement = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, quantity: quantity + 1 } });
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, quantity: quantity - 1 } });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div
      className={`${
        cart.length === 0 ? "w-full flex justify-center" : "lg:w-2/3 p-4"
      }`}
    >
      {cart.length === 0 ? (
        <p className="text-gray-700 text-center text-lg mt-48">Sua sacola está vazia!</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="w-full flex sm:flex-row justify-around items-start sm:items-center border p-4 rounded mb-4 shadow-md"
          >
            {/* Exibição da imagem do produto */}
            <div className="flex justify-start mb-4 sm:mb-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 sm:w-20 sm:h-20 object-cover rounded"
              />
            </div>

            {/* Informações do produto */}
            <div className="sm:w-3/4 sm:ml-4">
              <h3 className="text-lg font-semibold text-gray-800 mt-1">{item.name}</h3>
              <p className="text-blue-600 mb-3 mt-2">R$ {item.price.toFixed(2)}</p>

              {/* Controles de quantidade e botão de remover */}
              <div className="max-w-[100px] flex items-center -ml-1">
                <button
                  onClick={() => handleDecrement(item.id, item.quantity)}
                  className="px-1 py-1 rounded-l"
                >
                  <FiMinus />
                </button>
                <span className="px-2 text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id, item.quantity)}
                  className="px-1 py-1 rounded-r"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
