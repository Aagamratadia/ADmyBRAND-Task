"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Main Component
const AnimatedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Trigger change after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/pricing-demo' },
    { name: 'Blogs', href: '/blog' },
    { name: 'FAQ', href: '#faq' },
  ];

  // Framer Motion variants for the navbar container
  const navContainerVariants = {
    top: {
      // Wide, transparent state
      width: '95%',
      top: '1rem', // Changed from 2rem
      padding: '1.5rem 2.5rem',
      borderRadius: '1.5rem',
      backgroundColor: 'rgba(17, 24, 39, 0.3)', // Semi-transparent dark gray
    },
    scrolled: {
      // Compact, pill-shaped state
      width: '60%',
      top: '0.5rem', // Changed from 1rem
      padding: '0.75rem 2rem',
      borderRadius: '9999px', // Pill shape
      backgroundColor: 'rgba(17, 24, 39, 0.8)', // More opaque
    },
  };

  return (
    <>
      <motion.nav
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between border border-white/10 shadow-lg"
        style={{ backdropFilter: 'blur(16px)' }}
        initial="top"
        animate={isScrolled ? 'scrolled' : 'top'}
        variants={navContainerVariants}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30,
          duration: 0.3,
        }}
      >
        {/* Left: Logo */}
        <a href="/" className="flex items-center text-xl font-bold text-white" aria-label="Go to homepage">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
            <circle cx="16" cy="16" r="15" stroke="url(#g)" strokeWidth="2" />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5eead4" />
                <stop offset="0.5" stopColor="#818cf8" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
          ADmyBRAND 
        </a>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTA Button (Desktop) */}
        <div className="hidden md:block">
          <button
            className="px-5 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
            onClick={e => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                window.location.href = "/contact";
              }
            }}
          >
            Contact Sales
          </button>
        </div>

        {/* Right: Hamburger Menu (Mobile) */}
        <div className="md:hidden ml-4 sm:ml-6">
          <button onClick={toggleMobileMenu} className="text-white">
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 md:hidden"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900/90 p-8"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Menu</span>
                <button onClick={toggleMobileMenu} className="text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="mt-12 flex flex-col items-start gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className="text-2xl text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  className="mt-4 w-full py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300"
                  onClick={e => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                >
                  Contact Sales
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedNavbar;