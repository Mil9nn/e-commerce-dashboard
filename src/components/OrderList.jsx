// OrderList.jsx
import React, { useState, useEffect } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    }
    
    fetchOrders();
  }, []);
  
  if (loading) {
    return <div className="text-center py-4">Loading orders...</div>;
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left pl-4">Customer</th>
            <th className="text-left">Status</th>
            <th className="text-left">Items</th>
            <th className="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr 
                key={order._id} 
                className="h-12 border-gray-300 border-b"
              >
                <td className="pl-4">{order.customerName}</td>
                <td>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.items.length} items</td>
                <td>${order.totalAmount.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// AddOrderForm.jsx

function AddOrderForm() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [order, setOrder] = useState({
    customerName: '',
    items: [],
    totalAmount: 0
  });
  
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);
  
  const handleAddItem = () => {
    if (!selectedProduct) {
      return;
    }
    
    const product = products.find(p => p._id === selectedProduct);
    
    // Check if product already exists in order
    const existingItemIndex = orderItems.findIndex(
      item => item.productId === selectedProduct
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity if product already in order
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += Number(quantity);
      setOrderItems(updatedItems);
    } else {
      // Add new product to order
      setOrderItems([
        ...orderItems,
        {
          productId: selectedProduct,
          product: product,
          quantity: Number(quantity)
        }
      ]);
    }
    
    // Reset selection
    setSelectedProduct('');
    setQuantity(1);
  };
  
  const removeItem = (index) => {
    const updatedItems = [...orderItems];
    updatedItems.splice(index, 1);
    setOrderItems(updatedItems);
  };
  
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (orderItems.length === 0) {
      setMessage('Please add at least one item to the order.');
      return;
    }
    
    const orderData = {
      customerName: order.customerName,
      items: orderItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      totalAmount: calculateTotal()
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (data) {
        setMessage('Order created successfully!');
        setOrder({
          customerName: '',
          items: [],
          totalAmount: 0
        });
        setOrderItems([]);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      setMessage('Error creating order. Please try again.');
      console.error('Error creating order:', error);
    }
  };
  
  if (loading) {
    return <div className="text-center py-4">Loading products...</div>;
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="customerName">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={order.customerName}
            onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Order Items</h4>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <label className="block text-gray-700 mb-2" htmlFor="product">
                Product
              </label>
              <select
                id="product"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-1/4">
              <label className="block text-gray-700 mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/4 flex items-end">
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            </div>
          </div>
          
          {/* Display selected items */}
          {orderItems.length > 0 ? (
            <div className="mt-4">
              <h5 className="font-medium mb-2">Selected Items</h5>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Product</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                    <th className="py-2 px-4 text-left">Price</th>
                    <th className="py-2 px-4 text-left">Subtotal</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="py-2 px-4">{item.product.name}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">${item.product.price.toFixed(2)}</td>
                      <td className="py-2 px-4">${(item.product.price * item.quantity).toFixed(2)}</td>
                      <td className="py-2 px-4">
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="py-2 px-4" colSpan="3">Total</td>
                    <td className="py-2 px-4">${calculateTotal().toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 italic">No items added yet.</div>
          )}
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
}

export { OrderList, AddOrderForm };