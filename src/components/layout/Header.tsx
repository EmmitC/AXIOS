import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Moon, 
  Sun, 
  Globe,
  Search,
  Heart
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { languages } from '../../data/products';
import { Button } from '../ui/button';
import CartSidebar from '../ui/CartSidebar';
import LanguageDropdown from '../ui/LanguageDropdown';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems, toggleCart } = useCart();
  const { theme, toggleTheme, language } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[--bg]/95 backdrop-blur-md border-b-2 border-[--bg-secondary]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="font-['Bebas_Neue'] tracking-[0.15em]"
              >
                <span className="text-[--fg] text-3xl lg:text-4xl">Axios</span>
                <span className="text-[#e50914] text-3xl lg:text-4xl ml-2">&trade;</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative py-2 font-['Oswald'] text-sm tracking-widest uppercase transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-[--accent]'
                      : 'text-[--text-muted] hover:text-[--fg]'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[--accent]"
                      initial={false}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg] hover:bg-[--bg-secondary] transition-all">
                <Search className="w-5 h-5" />
              </button>
              
              <LanguageDropdown />
              
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg] hover:bg-[--bg-secondary] transition-all"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button className="w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--accent] hover:bg-[--bg-secondary] transition-all">
                <Heart className="w-5 h-5" />
              </button>

              <Link to="/login">
                <button className="w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg] hover:bg-[--bg-secondary] transition-all">
                  <User className="w-5 h-5" />
                </button>
              </Link>

              <button 
                onClick={toggleCart}
                className="relative w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg] hover:bg-[--bg-secondary] transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[--accent] text-white text-xs font-['Bebas_Neue'] w-5 h-5 flex items-center justify-center"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-3 bg[--bg]">
              <button 
                onClick={toggleCart}
                className="relative w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg]"
              >
                <ShoppingBag className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[--accent] text-white text-xs font-['Bebas_Neue'] w-5 h-5 flex items-center justify-center"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-[--fg]"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[--bg] border-t-2 border-[--bg-secondary]"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block py-3 font-['Oswald'] text-lg tracking-widest uppercase border-l-4 pl-4 transition-all ${
                      isActive(item.path)
                        ? 'text-[--fg] border-[--accent] bg-[--bg-secondary]'
                        : 'text-[--text-muted] border-transparent hover:border-[--border-color] hover:text-[--fg]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex items-center justify-between pt-4 border-t-2 border-[--bg-secondary]">
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg] border-2 border-[--bg-secondary] hover:border-[--accent]">
                      <Search className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={toggleTheme}
                      className="w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg] border-2 border-[--bg-secondary] hover:border-[--accent]"
                    >
                      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center text-[--text-muted] hover:text-[--fg] border-2 border-[--bg-secondary] hover:border-[--accent]">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <Link to="/login">
                    <button className="px-4 py-2 bg-[--accent] text-white font-['Oswald'] text-sm tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartSidebar />
    </>
  );
};

export default Header;
