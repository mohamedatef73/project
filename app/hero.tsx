"use client"
import React, { useState, useEffect } from 'react';
import { Grid, Search, Sparkles, Menu, X } from 'lucide-react';
import { products } from '@/lib/data';

function Hero() {
  const [category, setCategory] = useState<'all' | 'food' | 'wedding'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Inspire
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Services</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Gallery</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Book Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">Services</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">Gallery</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
              <button className="w-full text-left px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000"
            alt="Wedding Venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 
              className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Create Your Perfect Day
            </h1>
            <p 
              className={`text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Every detail matters in making your wedding dreams come true
            </p>
            <button 
              className={`px-8 py-3 bg-indigo-600 text-white rounded-md text-lg font-semibold hover:bg-indigo-700 
                transition-all duration-300 transform hover:scale-105
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Start Planning
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCategory('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  category === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategory('food')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  category === 'food'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Food
              </button>
              <button
                onClick={() => setCategory('wedding')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  category === 'wedding'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Wedding
              </button>
            </div>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Hero;