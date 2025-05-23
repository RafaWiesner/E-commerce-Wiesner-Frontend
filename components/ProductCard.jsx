import React from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Produto adicionado ao carrinho!');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border">
      {/* Imagem do Produto */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-contain mt-5"
        />
        <span className="absolute top-2 left-2 text-gray-800 text-xs uppercase px-2 py-1">
          Novo
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-xl text-gray-700">{product.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
        <p className="text-blue-600">R$ {product.price.toFixed(2)}</p>

        {/* Botões */}
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={handleDetails}
            className="bg-gray-100 border border-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-300 transition duration-300"
          >
            Detalhes
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-gray-800 text-white border border-gray-800 py-1 px-4 rounded hover:opacity-80 transition duration-300"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
