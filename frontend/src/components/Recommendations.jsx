import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdjustmentsHorizontalIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Recommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'cleansers', label: 'Cleansers' },
    { id: 'moisturizers', label: 'Moisturizers' },
    { id: 'serums', label: 'Serums' },
    { id: 'masks', label: 'Masks' },
  ];

  const products = [
    {
      id: 1,
      name: 'Hydrating Cleanser',
      brand: 'SkinLab',
      price: 29.99,
      rating: 4.8,
      category: 'cleansers',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['Hydrating', 'Gentle', 'pH Balanced'],
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      brand: 'GlowEssence',
      price: 49.99,
      rating: 4.9,
      category: 'serums',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['Brightening', 'Anti-oxidant', 'Fast-absorbing'],
    },
    // Add more products as needed
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const filteredProducts = products.filter(
    (product) => selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-orbitron font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Recommendations
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Discover products tailored to your skin's unique needs, carefully selected by our AI.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-4">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-primary" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-space text-sm transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-dark-lighter/30 text-gray-300 hover:bg-dark-lighter/50'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg bg-dark-lighter/30 text-gray-300 border border-primary/20 focus:border-primary/40 focus:outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-6 rounded-2xl bg-dark-lighter/30 backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-space font-bold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-400">{product.brand}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-5 w-5 text-primary" />
                        <span className="text-gray-300">{product.rating}</span>
                      </div>
                      <span className="text-xl font-space font-bold text-primary">
                        ${product.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-space text-sm hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Add to Routine</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations; 