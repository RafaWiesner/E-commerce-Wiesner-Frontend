import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { useApp } from '../context/AppContext.jsx';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const { state, dispatch } = useApp();
  const { user } = state;
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [animation, setAnimation] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);

  const phrases = [
    "Bem-vindo(a) à Wiesner.",
    "Aproveite nossas ofertas exclusivas.",
    "Encontre o relógio perfeito para você!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation("animate-slideOut");
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) =>
          prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
        );
        setAnimation("animate-slideIn");
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  const toggleMobileSubMenu = (menu) => {
    setMobileSubMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white shadow">
      {!isAuthPage && (
        <div className="bg-gray-800 text-white text-center text-sm h-7 overflow-hidden relative">
          <span className={`inline-block mt-[2px] ${animation}`}>
            {phrases[currentPhraseIndex]}
          </span>
        </div>
      )}

      {isAuthPage ? (
        <div className="flex justify-center items-center p-5">
          <Link to="/" className="text-4xl text-gray-800">WIESNER</Link>
        </div>
      ) : (
        <>
          <div className="flex items-center px-4 py-6 md:py-8 md:hidden lg:hidden xl:hidden">
            <button
              className="text-2xl md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            <Link
              to="/"
              className="font-sans text-3xl md:text-5xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-800 flex-1 text-center md:text-left"
            >
              WIESNER
            </Link>
            <Link to="/cart" className="text-2xl relative">
              <IoBagOutline />
              {cartItemsCount >= 0 && (
                <span className="absolute top-0 -right-1 bg-blue-600 text-white text-xs rounded-full px-1">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          <div className="hidden md:flex justify-between items-center p-6 md:py-9 lg:py-10 xl:px-8">
            <Link
              to="/"
              className="font-sans ml-[40px] text-5xl sm:text-4xl lg:text-5xl xl:text-[40px] text-gray-800"
            >
              WIESNER
            </Link>

            <nav className="hidden md:flex gap-6 lg:gap-6 text-base lg:text-lg xl:text-lg text-gray-700">
              <div
                className="relative group"
                onMouseEnter={() => setHoveredMenu("masculinos")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="hover:text-blue-600">
                  Relógios Masculinos
                </button>
                {hoveredMenu === "masculinos" && (
                  <div className="absolute top-full left-0 bg-white rounded text-[17px] shadow-lg p-4 w-40 leading-5">
                    <Link to="/" className="block hover:bg-gray-200 p-2">
                      Clássicos
                    </Link>
                    <Link to="" className="block hover:bg-gray-200 p-2">
                      Modernos
                    </Link>
                    <Link to="" className="block hover:bg-gray-200 p-2">
                      Esportivos
                    </Link>
                    <Link to="" className="block hover:bg-gray-200 p-2">
                      Acessórios
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="relative group"
                onMouseEnter={() => setHoveredMenu("femininos")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="hover:text-blue-600">
                  Relógios Femininos
                </button>
                {hoveredMenu === "femininos" && (
                  <div className="absolute top-full left-0 bg-white rounded text-[17px] shadow-lg p-4 w-40 leading-5">
                    <Link to="" className="block hover:bg-gray-200 p-2">
                      Clássicos
                    </Link>
                    <Link to="" className="block hover:bg-gray-200 p-2">
                      Modernos
                    </Link>
                    <Link to="" className="block hover:bg-gray-200 p-2">
                      Esportivos
                    </Link>
                    <Link to="" className="block hover:bg-gray-200 p-2">
                      Acessórios
                    </Link>
                  </div>
                )}
              </div>

              <Link to="" className="hover:text-blue-600">
                Smartwatch
              </Link>
              <Link to="" className="hover:text-blue-600">
                Novidades
              </Link>
              <Link to="" className="hover:text-blue-600">
                Promoções
              </Link>
            </nav>

            <nav className="hidden mr-3 md:flex space-x-4 lg:space-x-2 xl:space-x-5 lg:text-lg xl:text-lg text-gray-600">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 text-sm text-gray-800 hover:text-blue-600"
                  >
                    <span>Olá, {user.firstName}!</span>
                    <IoIosArrowDown className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Meu Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex max-w-28 leading-normal">
                  <div className="flex hover:text-blue-600">
                    <RxPerson className="text-4xl h-8 mr-1" />
                    <Link
                      to="/login"
                      className="text-xs text-gray-800 hover:text-blue-600"
                    >
                      Olá! Entre ou Cadastre-se
                    </Link>
                  </div>
                </div>
              )}
              <Link to="/cart" className="text-2xl relative">
                <IoBagOutline className="text-[28px] hover:text-blue-600" />
                {cartItemsCount >= 0 && (
                  <span className="absolute top-0 -right-1 bg-blue-600 text-white text-xs rounded-full px-[6px] py-[2px]">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {isMenuOpen && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-md z-40 overflow-y-auto">
              <div className="border-b px-4 pt-4 pb-2">
                {user ? (
                  <div>
                    <button
                      className="flex items-center w-full justify-between text-gray-800 font-semibold focus:outline-none"
                      onClick={() => setIsUserMenuOpen((open) => !open)}
                    >
                      <span>Olá, {user.firstName}</span>
                      <span className={`ml-2 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isUserMenuOpen && (
                      <div className="mt-2 bg-white rounded shadow border">
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsUserMenuOpen(false);
                            navigate('/perfil');
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Meu Perfil
                        </button>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Sair
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Entrar
                  </button>
                )}
              </div>
              <nav className="flex flex-col p-4 space-y-2 text-gray-800 text-base">
                <button
                  className="flex justify-between items-center hover:text-blue-600"
                  onClick={() => toggleMobileSubMenu("masculinos")}
                >
                  Relógios Masculinos
                </button>
                {mobileSubMenu === "masculinos" && (
                  <div className="pl-4 space-y-2">
                    <Link to="/" className="block hover:text-blue-600">
                      Clássicos
                    </Link>
                    <Link to="" className="block hover:text-blue-600">
                      Modernos
                    </Link>
                    <Link to="" className="block hover:text-blue-600">
                      Esportivos
                    </Link>
                    <Link to="" className="block hover:text-blue-600">
                      Acessórios
                    </Link>
                  </div>
                )}

                <button
                  className="flex justify-between items-center hover:text-blue-600"
                  onClick={() => toggleMobileSubMenu("femininos")}
                >
                  Relógios Femininos
                </button>
                {mobileSubMenu === "femininos" && (
                  <div className="pl-4 space-y-2">
                    <Link to="/" className="block hover:text-blue-600">
                      Clássicos
                    </Link>
                    <Link to="" className="block hover:text-blue-600">
                      Modernos
                    </Link>
                    <Link to="" className="block hover:text-blue-600">
                      Esportivos
                    </Link>
                    <Link to="" className="block hover:text-blue-600">
                      Acessórios
                    </Link>
                  </div>
                )}

                <Link to="/smartwatch" className="hover:text-blue-600">
                  Smartwatch
                </Link>
                <Link to="/novidades" className="hover:text-blue-600">
                  Novidades
                </Link>
                <Link to="/promocoes" className="hover:text-blue-600">
                  Promoções
                </Link>
              </nav>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
