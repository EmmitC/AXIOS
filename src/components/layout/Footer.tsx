import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface FooterProps {
  currentYear: number;
}

const Footer: React.FC<FooterProps> = ({ currentYear }) => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
  };

  return (
    <footer className="bg-[--bg] text-[--fg] border-t-2 border-[--bg-secondary]">
      {/* Newsletter Section */}
      <div className="border-b-2 border-[--bg-secondary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-['Bebas_Neue'] text-4xl lg:text-5xl mb-4 tracking-wider uppercase">
              Stay in the Loop
            </h3>
            <p className="text-gray-400 mb-8 font-['Roboto_Condensed']">
              Get exclusive access to new drops, sales, and style inspiration.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#1a1a1a] border-2 border-gray-700 text-white placeholder-gray-500 h-12 font-['Roboto_Condensed'] focus:border-[#e50914]"
                required
              />
              <button 
                type="submit" 
                className="bg-[#e50914] text-white hover:bg-[#c00812] px-6 h-12 font-['Oswald'] tracking-widest uppercase transition-all flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="font-['Bebas_Neue'] tracking-[0.15em]">
                <span className="text-[--accent] text-3xl">AXIOS</span>
                <span className="text-[#e50914] text-3xl ml-2">&trade;</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed font-['Roboto_Condensed']">
              Premium streetwear for the modern urbanite. Quality, style, and sustainability in every piece.
            </p>
            <div className="flex space-x-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 border-2 border-gray-700 hover:border-[#e50914] flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 border-2 border-gray-700 hover:border-[#e50914] flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 border-2 border-gray-700 hover:border-[#e50914] flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 border-2 border-gray-700 hover:border-[#e50914] flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Oswald'] tracking-widest uppercase text-[--accent] mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'New Arrivals', path: '/shop?filter=new' },
                { name: 'Best Sellers', path: '/shop?filter=featured' },
                { name: 'Sale', path: '/shop?filter=sale' },
                { name: 'Collections', path: '/shop' },
                { name: 'Size Guide', path: '/size-guide' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#e50914] transition-colors text-sm font-['Roboto_Condensed'] border-l-2 border-transparent hover:border-[#e50914] pl-3 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-['Oswald'] tracking-widest uppercase text-[--accent] mb-6 text-sm">Customer Care</h4>
            <ul className="space-y-3">
              {[
                'Contact Us',
                'Shipping Info',
                'Returns & Exchanges',
                'Size Guide',
                'FAQ'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#e50914] transition-colors text-sm font-['Roboto_Condensed'] border-l-2 border-transparent hover:border-[#e50914] pl-3 block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-['Oswald'] tracking-widest uppercase text-[--accent] mb-6 text-sm">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-[#e50914] mt-0.5" />
                <span className="text-gray-400 text-sm font-['Roboto_Condensed'] group-hover:text-white transition-colors">
                 axiosapparel@gmail.com              
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 text-[#e50914] mt-0.5" />
                <span className="text-gray-400 text-sm font-['Roboto_Condensed'] group-hover:text-white transition-colors">
                  +256 (765) 829-806
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-[#e50914] mt-0.5" />
                <span className="text-gray-400 text-sm font-['Roboto_Condensed'] group-hover:text-white transition-colors">
                  Kampala, UG
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm font-['Roboto_Condensed']">
              © <span id="year" className="w-5 h-5 text-[#e50914] mt-0.5">{currentYear}</span> Axios&trade; All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-[#e50914] text-sm font-['Roboto_Condensed'] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#e50914] text-sm font-['Roboto_Condensed'] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-[#e50914] text-sm font-['Roboto_Condensed'] transition-colors">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
