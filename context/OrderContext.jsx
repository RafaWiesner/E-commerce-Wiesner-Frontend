import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useApp } from './AppContext';
import api from '../services/api';

const OrderContext = createContext();

const initialState = {
  orders: [],
  loading: false,
  error: null
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_ORDERS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { state: appState } = useApp();
  const token = appState.token;

  const fetchOrders = async () => {
    try {
      dispatch({ type: 'FETCH_ORDERS_START' });
      const response = await api.get('/orders');
      dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      dispatch({ 
        type: 'FETCH_ORDERS_ERROR', 
        payload: error.response?.data?.message || 'Erro ao carregar pedidos' 
      });
    }
  };

  const addOrder = async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      dispatch({ type: 'ADD_ORDER', payload: response.data.order });
      await fetchOrders();
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error(error.response?.data?.message || 'Erro ao criar pedido');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      dispatch({ 
        type: 'UPDATE_ORDER_STATUS', 
        payload: { id: orderId, status } 
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      throw new Error(error.response?.data?.message || 'Erro ao atualizar status do pedido');
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: [] });
    }
  }, [token]);

  return (
    <OrderContext.Provider value={{
      orders: state.orders,
      loading: state.loading,
      error: state.error,
      fetchOrders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder deve ser usado dentro de um OrderProvider');
  }
  return context;
}; 