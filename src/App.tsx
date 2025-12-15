import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import HelpPanel from './components/ui/HelpPanel';
import NewsletterModal from './components/ui/NewsletterModal';

// Page Components
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import AboutPage from './components/pages/AboutPage';
import BlogPage from './components/pages/BlogPage';
import CheckoutPage from './components/pages/CheckoutPage';
import LoginPage from './components/pages/LoginPage';

// Context
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// Custom Hook
import { useScrollAnimation } from './hooks/useScrollAnimation';

function App() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useScrollAnimation();

  useEffect(() => {
    // Show newsletter modal after 5 seconds
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[--bg] text-[--fg] transition-colors duration-300">
            <Header />
            
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </AnimatePresence>

            <Footer currentYear={currentYear} />
            
            {/* Floating Elements */}
            <BackToTop />
            <HelpPanel 
              isOpen={showHelp} 
              onToggle={() => setShowHelp(!showHelp)} 
            />

            {/* Modals */}
            <NewsletterModal 
              isOpen={showNewsletter}
              onClose={() => setShowNewsletter(false)}
            />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;