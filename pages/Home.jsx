import React from "react";
import { useApp } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Footer from "../components/Footer.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Header from '../components/Header.jsx';
import { products } from '../data/products.js';
import bannerPrincipal from '../assets/bannerprincipal.jpeg';

const Home = () => {
  const { state, dispatch } = useApp();

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
  };

  return (
    <div className="min-h-screen pt-[93px] sm:pt-[105px] md:pt-[137px] lg:pt-[160px]">
      <Header />
      
      {/* Hero Section com Imagem */}
      <section className="relative flex flex-col-reverse lg:flex-row mt-5 lg:mx-28">
        <div className="max-w-[300px] mx-auto lg:mx-10 absolute lg:relative top-10 inset-0 md:flex flex-col items-center justify-center text-gray-700 text-center">
          <h1 className="text-2xl py-1 rounded lg:text-3xl md:text-3xl font-thin mb-4 bg-gray-900 lg:p-1.5 lg:px-3 text-white">
            RELÓGIOS PREMIUM
          </h1>
          <p className="text-lg text-white lg:text-gray-800 mx-4 md:text-3xl lg:mb-6 max-w-md mt-2">
            QUALIDADE E ESTILO EM UM SÓ LUGAR.
          </p>
          <button className="text-xl px-2 p-1 border-r border-b mt-4 lg:mt-2 lg:mb-5 bg-gray-50 border-gray-400 hover:scale-110 lg:px-8 lg:p-1 rounded font-thin text-gray-800 lg:text-2xl transition duration-300">
            SAIBA MAIS
          </button>
        </div>
        <div>
          <img
            src={bannerPrincipal}
            alt="Relógio Exclusivo"
            className="w-full h-[475px] object-cover lg:ml-14"
          />
        </div>
      </section>

      {/* Produtos - Mais Vendidos */}
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font text-gray-800 mb-5 text-center">
          Mais Vendidos
        </h2>

        {/* Carrossel para Dispositivos Móveis */}
        <div className="flex lg:grid lg:grid-cols-3 gap-8 mx-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {products && products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full max-w-sm lg:max-w-none snap-center mx-auto"
            >
              <ProductCard 
                product={product} 
                addToCart={() => addToCart(product)} 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
