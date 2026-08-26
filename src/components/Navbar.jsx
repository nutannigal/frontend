// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // If on admin routes, don't show the public navbar
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo - ● ELEVATURA */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-[#111111] group"
          >
            {/* Orange dot */}
            <span className="w-3.5 h-3.5 rounded-full bg-[#F5A623] inline-block transition-transform duration-300 group-hover:scale-125" />
            <span className="font-extrabold tracking-wider text-[#111111] uppercase text-xl sm:text-2xl">
              ELEVATURA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[15px] font-medium text-[#222222] hover:text-[#F5A623] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Button - Get Started Today */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              className="bg-[#111111] hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm active:scale-95"
            >
              Get Started Today
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#111111] hover:text-[#F5A623] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5 cursor-pointer">
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-5'}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Slide-out / Dropdown Menu for Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-neutral-100 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#111111] hover:text-[#F5A623] transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-100">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-[#111111] text-white py-3 rounded-full text-sm font-medium"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;