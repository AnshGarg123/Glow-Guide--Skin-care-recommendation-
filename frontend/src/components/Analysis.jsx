import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const Analysis = () => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        skinType: 'Combination',
        concerns: ['Dryness', 'Uneven Texture'],
        recommendations: [
          'Hydrating Cleanser',
          'Exfoliating Toner',
          'Moisturizing Serum',
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

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
              Skin Analysis
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Upload a clear photo of your face to receive personalized skincare recommendations
            powered by our advanced AI technology.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative p-8 rounded-2xl bg-dark-lighter/30 backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <div className="aspect-square rounded-xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-6">
                <AnimatePresence mode="wait">
                  {!image ? (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <PhotoIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">
                        Drag and drop your photo here, or click to browse
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <motion.label
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        htmlFor="image-upload"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-space text-sm hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
                      >
                        Choose File
                      </motion.label>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-dark/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors"
                      >
                        <ArrowPathIcon className="h-5 w-5 text-primary" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={!image || isAnalyzing}
                className={`w-full mt-6 px-6 py-3 rounded-lg font-space text-white transition-all ${
                  !image || isAnalyzing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20'
                }`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Photo'}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {results && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-8 rounded-2xl bg-dark-lighter/30 backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">
                    Analysis Results
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-space text-primary mb-2">
                        Skin Type
                      </h3>
                      <p className="text-gray-300">{results.skinType}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-space text-primary mb-2">
                        Concerns
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {results.concerns.map((concern, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                          >
                            {concern}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-space text-primary mb-2">
                        Recommended Products
                      </h3>
                      <ul className="space-y-2">
                        {results.recommendations.map((product, index) => (
                          <li
                            key={index}
                            className="text-gray-300 flex items-center space-x-2"
                          >
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span>{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Analysis; 