import React from 'react';
import Header from './Header';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h2>
            <p className="text-3xl font-bold">$24,500</p>
            <p className="text-green-500 text-sm">+12% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Orders</h2>
            <p className="text-3xl font-bold">356</p>
            <p className="text-green-500 text-sm">+5% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Inventory</h2>
            <p className="text-3xl font-bold">1,245</p>
            <p className="text-red-500 text-sm">-2% from last month</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Trends</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Chart content will go here
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Revenue Growth</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Chart content will go here
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-3">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
            <div className="bg-gray-100 rounded p-4">
              <p className="text-center text-gray-500">Order table will go here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;