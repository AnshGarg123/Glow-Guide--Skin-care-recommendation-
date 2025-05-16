import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SparklesIcon, ChartBarIcon, BeakerIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Analysis',
      description: 'Get personalized skincare recommendations based on advanced AI analysis of your skin.',
    },
    {
      icon: ChartBarIcon,
      title: 'Track Progress',
      description: 'Monitor your skin health improvements over time with detailed analytics.',
    },
    {
      icon: BeakerIcon,
      title: 'Smart Recommendations',
      description: 'Receive tailored product suggestions based on your skin type and concerns.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-orbitron font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Transform Your Skin
              </span>
              <br />
              <span className="text-white">with AI-Powered Care</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Experience personalized skincare recommendations powered by advanced artificial intelligence.
              Get started with your journey to healthier, glowing skin today.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center gap-4">
              <Link to="/analysis">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-space text-lg hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  Start Analysis
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-dark-lighter/50 backdrop-blur-sm border border-primary/20 text-white font-space text-lg hover:border-primary/40 transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-8 rounded-2xl bg-dark-lighter/30 backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-space font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
            <div className="relative p-12 md:p-20 text-center">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-orbitron font-bold mb-6"
              >
                Ready to Transform Your Skincare Routine?
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of users who have already discovered their perfect skincare routine with our AI-powered platform.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link to="/analysis">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-space text-lg hover:shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    Get Started Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 