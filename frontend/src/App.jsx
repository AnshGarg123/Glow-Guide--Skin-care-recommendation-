import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Analysis from './components/Analysis';
import Recommendations from './components/Recommendations';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [particlesInit, setParticlesInit] = useState(null);

  useEffect(() => {
    setParticlesInit(() => loadSlim);
  }, []);

  const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#00eaff"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out"
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#00eaff",
        opacity: 0.2,
        width: 1
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5
          }
        }
      }
    }
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="fixed inset-0 bg-gradient-to-br from-dark via-dark-lighter to-secondary-dark opacity-90" />
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="fixed inset-0"
        />
        
        <div className="relative z-10">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App; 