import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useOrder } from '../context/OrderContext';
import { FaUser, FaMapMarkerAlt, FaShoppingBag, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import OrderList from '../components/OrderList';

const Profile = () => {
  const { state, dispatch } = useApp();
  const { user } = state;
  const { orders, loading, error } = useOrder();
  const [activeTab, setActiveTab] = useState('perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      street: 'Rua Exemplo',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      isDefault: true,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Aqui você implementaria a lógica para salvar no backend
    dispatch({ type: 'UPDATE_USER', payload: formData });
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    // Implementar lógica para adicionar novo endereço
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregue':
        return 'bg-green-100 text-green-800';
      case 'Em Processamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Trânsito':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Menu Lateral */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('perfil')}
              className={`w-full flex items-center space-x-2 p-2 rounded ${
                activeTab === 'perfil' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <FaUser />
              <span>Dados Pessoais</span>
            </button>
            <button
              onClick={() => setActiveTab('enderecos')}
              className={`w-full flex items-center space-x-2 p-2 rounded ${
                activeTab === 'enderecos' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <FaMapMarkerAlt />
              <span>Endereços</span>
            </button>
            <button
              onClick={() => setActiveTab('pedidos')}
              className={`w-full flex items-center space-x-2 p-2 rounded ${
                activeTab === 'pedidos' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <FaShoppingBag />
              <span>Meus Pedidos</span>
            </button>
          </nav>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'perfil' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setActiveTab('perfil')}
            >
              Perfil
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'pedidos' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setActiveTab('pedidos')}
            >
              Pedidos
            </button>
          </div>

          {activeTab === 'perfil' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Dados Pessoais</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                  <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p className="font-medium">{formData.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sobrenome</p>
                      <p className="font-medium">{formData.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'enderecos' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Meus Endereços</h2>
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Adicionar Endereço
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                        </p>
                        <p className="text-gray-600">
                          {address.neighborhood}, {address.city} - {address.state}
                        </p>
                        <p className="text-gray-600">CEP: {address.zipCode}</p>
                      </div>
                      <div className="flex space-x-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Definir como padrão
                          </button>
                        )}
                        {address.isDefault && (
                          <span className="text-green-600">Endereço padrão</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pedidos' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Meus Pedidos</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Carregando pedidos...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">
                  <p>{error}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Você ainda não tem pedidos.</p>
                </div>
              ) : (
                <OrderList 
                  orders={orders} 
                  expandedOrder={expandedOrder} 
                  setExpandedOrder={setExpandedOrder} 
                  getStatusColor={getStatusColor}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 