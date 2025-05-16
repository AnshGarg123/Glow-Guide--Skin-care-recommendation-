import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/analysis', label: 'Analysis' },
    { path: '/recommendations', label: 'Recommendations' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-lg bg-dark/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-orbitron font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              AI Skincare
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <span className={`text-sm font-space tracking-wide ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                }`}>
                  {item.label}
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: location.pathname === item.path ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-dark-lighter/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-primary" />
              ) : (
                <MoonIcon className="h-5 w-5 text-primary" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-space text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 