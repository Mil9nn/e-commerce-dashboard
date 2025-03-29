import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const { authAxios } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await authAxios.get(`/orders/${id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id, authAxios]);
  
  const handleStatusChange = async (newStatus) => {
    try {
      await authAxios.patch(`/orders/${id}`, { status: newStatus });
      setOrder({...order, status: newStatus});
    } catch (err) {
      setError('Failed to update order status: ' + (err.response?.data?.message || err.message));
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading order details...</p>
          </div>
        </main>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/orders')}
          >
            Back to Orders
          </button>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Order Details</h1>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/orders')}
            >
              Back to Orders
            </button>
          </div>
          
          {order && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                    <p className="text-gray-600">Customer: {order.customerName}</p>
                  </div>
                  <div>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange('Pending')}
                  >
                    Mark as Pending
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange('Processing')}
                  >
                    Mark as Processing
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange('Completed')}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items && order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.productId.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${item.productId.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${(item.quantity * item.productId.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="px-6 py-4 text-right font-medium">Total</td>
                      <td className="px-6 py-4 font-bold">${order.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;