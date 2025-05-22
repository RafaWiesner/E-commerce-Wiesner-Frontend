import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      // Limpar dados antigos de autenticação
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(),
        password: password.trim()
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error('Resposta inválida do servidor');
      }

      // Salvar novo token e dados do usuário
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

      // Redirecionar para a página anterior ou home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Erro completo:', err);
      if (err.response) {
        console.error('Dados do erro:', {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers
        });
      }
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen pt-[93px] sm:pt-[105px] md:pt-[137px] lg:pt-[160px] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Não tem uma conta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-gray-800 hover:underline"
          >
            Cadastre-se
          </button>
        </p>
        <p className="mt-2 text-center text-gray-600">
          Esqueceu sua senha?{' '}
          <button
            onClick={() => navigate('/reset-password')}
            className="text-gray-800 hover:underline"
          >
            Resetar senha
          </button>
        </p>
      </div>
    </div>
  );
} 