import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Check } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Checkbox } from './checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    zipCode: '',
    country: 'United States',
    consent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    
    // Simulate subscription
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({
        email: '',
        zipCode: '',
        country: 'United States',
        consent: false
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'Other'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0d0d0d] text-white border-2 border-[#1a1a1a] p-0 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#e50914] text-white border border-white/20 hover:border-[#e50914] transition-all z-10"
          aria-label="Close newsletter modal"
        >
          <X className="w-5 h-5" />
        </button>

        <DialogHeader className="text-center p-8 pb-0">
          <DialogTitle className="font-['Bebas_Neue'] text-4xl tracking-[0.1em] text-white mb-2 uppercase">
            Get Updates
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-['Roboto_Condensed'] text-sm">
            Subscribe to get exclusive access to new drops, sales, and style inspiration.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-8"
          >
            <div className="w-20 h-20 bg-[#e50914] flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-['Bebas_Neue'] text-3xl mb-3 text-white tracking-wider">
              Welcome to Axios!
            </h3>
            <p className="text-gray-400 font-['Roboto_Condensed']">
              Thank you for subscribing. Check your inbox for a welcome email.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-6">
            <div>
              <Label 
                htmlFor="newsletter-email" 
                className="text-white font-['Oswald'] uppercase tracking-widest text-xs mb-3 block"
              >
                Email Address
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-[#1a1a1a] border-2 border-gray-700 text-white placeholder-gray-600 h-12 font-['Roboto_Condensed'] focus:border-[#e50914]"
                required
              />
            </div>

            <div>
              <Label 
                htmlFor="zip-code" 
                className="text-white font-['Oswald'] uppercase tracking-widest text-xs mb-3 block"
              >
                Zip or Postal Code
              </Label>
              <Input
                id="zip-code"
                placeholder="12345"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="bg-[#1a1a1a] border-2 border-gray-700 text-white placeholder-gray-600 h-12 font-['Roboto_Condensed'] focus:border-[#e50914]"
              />
            </div>

            <div>
              <Label 
                htmlFor="country" 
                className="text-white font-['Oswald'] uppercase tracking-widest text-xs mb-3 block"
              >
                Country
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className="bg-[#1a1a1a] border-2 border-gray-700 text-white h-12 font-['Roboto_Condensed'] focus:border-[#e50914]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0d0d0d] border-2 border-gray-700">
                  {countries.map((country) => (
                    <SelectItem 
                      key={country} 
                      value={country} 
                      className="text-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] font-['Roboto_Condensed']"
                    >
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#e50914] hover:bg-[#c00812] text-white h-12 font-['Bebas_Neue'] text-xl tracking-[0.15em] uppercase transition-all border-2 border-[#e50914] hover:border-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.email}
            >
              Subscribe
            </motion.button>

            <div className="text-center text-xs text-gray-500 space-y-1 pt-4 border-t-2 border-[#1a1a1a] font-['Roboto_Condensed']">
              <p>EMAILS WILL BE SENT BY OR ON BEHALF OF AXIOS APPAREL</p>
              <p>YOU MAY WITHDRAW YOUR CONSENT AT ANYTIME.</p>
              <p className="text-gray-600">
                <a href="#" className="hover:text-[#e50914] transition-colors">PRIVACY POLICY</a> / 
                <a href="#" className="hover:text-[#e50914] transition-colors ml-1">DO NOT SELL MY PERSONAL INFORMATION</a>
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
