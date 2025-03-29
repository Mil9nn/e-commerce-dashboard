import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import { AddOrderForm } from '../components/OrderList';

const CreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { authAxios } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <AddOrderForm />
          
          <div className="mt-6">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => navigate('/orders')}
            >
              Back to Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateOrder;