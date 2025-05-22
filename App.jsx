import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import CartPage from "./pages/CartPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./components/AboutUs.jsx";
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import { AppProvider } from './context/AppContext';
import { OrderProvider } from './context/OrderContext';
import SuccessPage from './pages/SuccessPage';

const App = () => {
  return (
    <AppProvider>
      <OrderProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/sucesso" element={<SuccessPage />} />
          </Routes>
          <AboutUs/>
          <Footer />
        </div>
      </OrderProvider>
    </AppProvider>
  );
};

export default App;
