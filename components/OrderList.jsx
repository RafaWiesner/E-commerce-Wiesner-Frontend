import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function OrderList({ orders, expandedOrder, setExpandedOrder, getStatusColor }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Pedido #{order.id}</p>
                <p className="text-gray-600">Data: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</p>
                <p className="text-gray-600">Total: R$ {Number(order.totalAmount).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                {expandedOrder === order.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
          </div>
          {expandedOrder === order.id && (
            <div className="p-4 bg-gray-50 border-t">
              <h3 className="font-medium mb-2">Itens do Pedido</h3>
              <div className="space-y-2">
                {order.items && order.items.length > 0 ? order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                )) : <p className="text-gray-600">Nenhum item encontrado.</p>}
              </div>
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">Endereço de Entrega</h3>
                <p className="text-gray-600">
                  {order.shippingAddress?.address}
                  {order.shippingAddress?.complement && `, ${order.shippingAddress.complement}`}<br />
                  {order.shippingAddress?.city} - {order.shippingAddress?.state}<br />
                  CEP: {order.shippingAddress?.zipCode}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 