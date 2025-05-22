import React from "react";
import Cart from "../components/Cart.jsx";
import Checkout from "../components/Checkout.jsx";
import Footer from "../components/Footer.jsx";
import { useApp } from '../context/AppContext.jsx';

const CartPage = () => {
  const { state } = useApp();
  const { cart } = state;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-28 mx-6 p-4 lg:mx-16 lg:mt-44">
      {/* Título centralizado */}
      <h1 className="text-2xl text-gray-800 text-center lg:mb-4">Minha sacola</h1>

      {/* Layout principal */}
      <div className="lg:flex lg:gap-5">
        <Cart />
        {cart.length > 0 && <Checkout total={total} />}
      </div>
    </div>
  );
};

export default CartPage;
