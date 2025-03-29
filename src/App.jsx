import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import OrderDetail from './pages/OrderDetail';
import CreateProduct from './pages/CreateProduct';
import CreateOrder from './pages/CreateOrder';
import Users from './pages/Users';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
          <Route path="/products/new" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
          <Route path="/orders/new" element={<PrivateRoute><CreateOrder /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute adminOnly={true}><Users /></PrivateRoute>} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;