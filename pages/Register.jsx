import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;

      // Salvar token e dados do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Atualizar o contexto
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      });
      
      // Redirecionar para a página inicial
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro');
    }
  };

  return (
    <div className="min-h-screen pt-[93px] sm:pt-[105px] md:pt-[137px] lg:pt-[160px]">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastro</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Cadastro realizado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 mb-2">Nome</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700 mb-2">Sobrenome</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Já tem uma conta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-gray-800 hover:underline"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register; 