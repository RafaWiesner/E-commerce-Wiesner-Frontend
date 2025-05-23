import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useOrder } from '../context/OrderContext';


export default function PaymentPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { addOrder } = useOrder();
  const { cart, user } = state;
  const [step, setStep] = useState('address'); // 'address' ou 'payment'
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    address: '',
    complement: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Por favor, faça login para continuar');
      navigate('/login');
      return;
    }

    // Verificar se há itens no carrinho
    if (state.cart.length === 0) {
      alert('Seu carrinho está vazio');
      navigate('/cart');
      return;
    }
  }, [state.cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      // Remove todos os caracteres não numéricos
      const numbers = value.replace(/\D/g, '');
      // Adiciona espaço a cada 4 dígitos
      formattedValue = numbers.replace(/(\d{4})/g, '$1 ').trim();
      // Limita a 19 caracteres (16 dígitos + 3 espaços)
      formattedValue = formattedValue.slice(0, 19);
    } else if (name === 'expiryDate') {
      // Remove todos os caracteres não numéricos
      const numbers = value.replace(/\D/g, '');
      // Adiciona barra após os primeiros 2 dígitos
      if (numbers.length > 2) {
        formattedValue = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
      } else {
        formattedValue = numbers;
      }
      // Limita a 5 caracteres (4 dígitos + 1 barra)
      formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'zipCode') {
      // Formatar CEP (00000-000)
      const numbers = value.replace(/\D/g, '');
      if (numbers.length > 5) {
        formattedValue = `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
      } else {
        formattedValue = numbers;
      }
      formattedValue = formattedValue.slice(0, 9);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Validar campos do endereço
    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      setError('Por favor, preencha todos os campos do endereço');
      return;
    }
    setStep('payment');
    setError('');
  };

  // Função utilitária para garantir URL absoluta da imagem
  const getImageUrl = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('http')) return imgPath;
    // Remove '/src' se existir e garante que começa com '/assets'
    const cleanPath = imgPath.replace('/src', '');
    return `https://e-commerce-wiesner-frontend.vercel.app${cleanPath}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Você precisa estar logado para finalizar a compra');
      setIsLoading(false);
      navigate('/login');
      return;
    }

    try {
      // Validar dados do formulário
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.name ||
          !formData.address || !formData.city || !formData.state || !formData.zipCode) {
        setError('Por favor, preencha todos os campos obrigatórios');
        setIsLoading(false);
        return;
      }

      // Criar o pedido usando o contexto
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          ProductImage: getImageUrl(item.image)
        })),
        shippingAddress: {
          address: formData.address,
          complement: formData.complement || '',
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        paymentMethod: 'cartao',
        totalAmount: parseFloat(cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2))
      };

      console.log('Dados do pedido:', orderData);

      const response = await addOrder(orderData);
      
      // Limpar o carrinho após o pedido ser criado
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirecionar para a página de sucesso
      navigate('/sucesso', { 
        state: { 
          orderId: response.order.id 
        } 
      });
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      if (err.message.includes('Token inválido') || err.message.includes('Unauthorized')) {
        // Se o token estiver inválido, redirecionar para o login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Sua sessão expirou. Por favor, faça login novamente.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(err.message || 'Erro ao processar o pagamento. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validar dados do formulário
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.name ||
          !formData.address || !formData.city || !formData.state || !formData.zipCode) {
        setError('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      // Criar o pedido
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          image: getImageUrl(item.image)
        })),
        shippingAddress: {
          address: formData.address,
          complement: formData.complement || '',
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        paymentMethod: 'cartao',
        totalAmount: parseFloat(cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2))
      };

      console.log('Dados do pedido:', orderData);

      const response = await addOrder(orderData);
      
      // Limpar o carrinho após o pedido ser criado
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirecionar para a página de sucesso
      navigate('/sucesso', { 
        state: { 
          orderId: response.order.id 
        } 
      });
    } catch (error) {
      setError(error.message || 'Erro ao processar o pagamento. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[93px]">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Finalizar Compra</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            {state.cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            {step === 'address' ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Endereço</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Complemento</label>
                    <input
                      type="text"
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      placeholder="Apto, Bloco, etc. (opcional)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Estado</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">CEP</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="00000-000"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      required
                      maxLength={9}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors text-xl"
                  >
                    Continuar para Pagamento
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Informações do Cartão</h2>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Número do Cartão</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      required
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Nome no Cartão</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Validade</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('address')}
                      className="w-1/2 bg-gray-500 text-white py-3 rounded hover:bg-gray-600 transition-colors text-xl"
                      disabled={isLoading}
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className={`w-1/2 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors text-xl disabled:opacity-50 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processando...' : 'Finalizar Compra'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 