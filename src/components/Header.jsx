import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600">CompanyName</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Dashboard</Link>
            <Link to="/inventory" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Inventory</Link>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Orders</Link>
            <Link to="/users" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Users</Link>
            <Link to="/settings" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Settings</Link>
          </nav>
          
          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-700 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                  <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Dashboard</Link>
            <Link to="/inventory" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Inventory</Link>
            <Link to="/orders" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Orders</Link>
            <Link to="/users" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Users</Link>
            <Link to="/settings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Settings</Link>
          </div>
          <div className="px-2 pt-2 pb-3 border-t">
            <div className="relative mt-3">
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-3 flex justify-between">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
              </button>
              <Link to="/profile" className="text-gray-700">Profile</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;