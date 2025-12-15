import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, Search, ShoppingBag, User, MessageCircle, Phone, Mail } from 'lucide-react';
import { Input } from './input';

interface HelpPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HelpPanel: React.FC<HelpPanelProps> = ({ isOpen, onToggle }) => {
  const helpTopics = [
    {
      icon: ShoppingBag,
      title: 'Shopping & Orders',
      description: 'Track orders, returns, and exchanges'
    },
    {
      icon: User,
      title: 'Account & Profile',
      description: 'Manage your account settings'
    },
    {
      icon: Search,
      title: 'Product Information',
      description: 'Size guides, materials, and care'
    },
    {
      icon: MessageCircle,
      title: 'General Support',
      description: 'Get help with any other questions'
    }
  ];

  return (
    <>
      {/* Help Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="fixed bottom-8 left-8 z-40 w-14 h-14 bg-[#1a1a1a] hover:bg-[#e50914] border-2 border-gray-700 hover:border-white text-white flex items-center justify-center transition-all shadow-lg"
        aria-label="Help and support"
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>

      {/* Help Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-96 bg-[#0d0d0d] border-r-2 border-[#1a1a1a] shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-[#1a1a1a]">
                  <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wider">How Can We Help?</h2>
                  <button 
                    onClick={onToggle}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-700 hover:border-[#e50914] text-white transition-all"
                    aria-label="Close help panel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for help..."
                    className="pl-12 bg-[#1a1a1a] border-2 border-gray-700 text-white placeholder-gray-500 h-12 font-['Roboto_Condensed'] focus:border-[#e50914]"
                  />
                </div>

                {/* Quick Actions */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-['Oswald'] text-xs text-gray-500 uppercase tracking-widest">
                    Quick Help
                  </h3>
                  {helpTopics.map((topic, index) => (
                    <motion.button
                      key={topic.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="w-full p-4 bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:border-[#e50914] transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <topic.icon className="w-5 h-5 text-[#e50914] mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-['Oswald'] text-white mb-1 tracking-wide group-hover:text-[#e50914] transition-colors">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-gray-400 font-['Roboto_Condensed']">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Contact Options */}
                <div className="space-y-4">
                  <h3 className="font-['Oswald'] text-xs text-gray-500 uppercase tracking-widest">
                    Contact Support
                  </h3>
                  
                  <div className="space-y-3">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center gap-3 p-4 bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:border-[#e50914] transition-all group"
                    >
                      <Phone className="w-5 h-5 text-[#e50914]" />
                      <div>
                        <div className="font-['Oswald'] text-white text-sm tracking-wide group-hover:text-[#e50914] transition-colors">
                          Call Us
                        </div>
                        <div className="text-xs text-gray-400 font-['Roboto_Condensed']">
                          +256 (765) 829-806
                        </div>
                      </div>
                    </a>

                    <a
                      href="mailto:support@axiosapparel.com"
                      className="flex items-center gap-3 p-4 bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:border-[#e50914] transition-all group"
                    >
                      <Mail className="w-5 h-5 text-[#e50914]" />
                      <div>
                        <div className="font-['Oswald'] text-white text-sm tracking-wide group-hover:text-[#e50914] transition-colors">
                          Email Us
                        </div>
                        <div className="text-xs text-gray-400 font-['Roboto_Condensed']">
                          support@axiosapparel.com
                        </div>
                      </div>
                    </a>

                    <button className="flex items-center gap-3 p-4 bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:border-[#e50914] transition-all w-full text-left group">
                      <MessageCircle className="w-5 h-5 text-[#e50914]" />
                      <div>
                        <div className="font-['Oswald'] text-white text-sm tracking-wide group-hover:text-[#e50914] transition-colors">
                          Live Chat
                        </div>
                        <div className="text-xs text-gray-400 font-['Roboto_Condensed']">
                          Available 9AM - 9PM EST
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-8 p-4 bg-[#1a1a1a] border-l-4 border-[#e50914]">
                  <h4 className="font-['Oswald'] text-white text-sm mb-3 tracking-wide uppercase">Support Hours</h4>
                  <div className="text-sm text-gray-400 font-['Roboto_Condensed'] space-y-1">
                    <div>Monday - Friday: 9AM - 9PM EST</div>
                    <div>Saturday - Sunday: 10AM - 6PM EST</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpPanel;
