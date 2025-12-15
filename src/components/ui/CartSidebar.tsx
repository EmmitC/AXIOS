import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Trash2, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from './button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './sheet';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const CartSidebar: React.FC = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    orderSummary,
    getTotalItems 
  } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-[#0d0d0d] border-l-2 border-[#1a1a1a]">
        <SheetHeader className="p-6 border-b-2 border-[#1a1a1a]">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3 font-['Bebas_Neue'] text-3xl tracking-wider text-white uppercase">
              <ShoppingBag className="w-7 h-7 text-[#e50914]" />
              Cart ({getTotalItems()})
            </SheetTitle>
            <button 
              onClick={toggleCart}
              className="w-10 h-10 flex items-center justify-center border-2 border-gray-700 hover:border-[#e50914] text-white transition-all"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <SheetDescription className="sr-only">
            Review and manage items in your shopping cart
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-24 h-24 border-4 border-[#1a1a1a] flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="font-['Bebas_Neue'] text-3xl mb-3 text-white tracking-wider">Your Cart is Empty</h3>
              <p className="text-gray-400 mb-8 font-['Roboto_Condensed']">
                Start shopping to add items to your cart
              </p>
              <Link to="/shop" onClick={toggleCart}>
                <button className="px-8 py-3 bg-[#e50914] text-white font-['Oswald'] tracking-widest uppercase hover:bg-[#c00812] transition-all">
                  Browse Products
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 pb-6 border-b-2 border-[#1a1a1a]"
                    >
                      <div className="w-24 h-24 overflow-hidden flex-shrink-0 bg-[#1a1a1a]">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-['Bebas_Neue'] text-lg text-white mb-1 line-clamp-2 tracking-wide">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-gray-500 mb-3 font-['Roboto_Condensed'] uppercase tracking-wider">
                          {item.color} • {item.size}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border-2 border-gray-700 bg-[#1a1a1a]">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#e50914] hover:border-[#e50914] transition-all text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-1 text-sm min-w-[2.5rem] text-center text-white font-['Bebas_Neue'] text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#e50914] hover:border-[#e50914] transition-all text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="font-['Bebas_Neue'] text-xl text-[#e50914] tracking-wider">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 hover:border-[#e50914] text-gray-400 hover:text-[#e50914] transition-all"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t-2 border-[#1a1a1a] p-6 space-y-6 bg-[#0d0d0d]">
              <div className="space-y-3">
                <div className="flex justify-between font-['Roboto_Condensed'] text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-['Roboto_Condensed'] text-sm text-gray-400">
                  <span>Shipping</span>
                  <span className="text-white">
                    {orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-['Roboto_Condensed'] text-sm text-gray-400">
                  <span>Tax</span>
                  <span className="text-white">${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-[#1a1a1a] pt-3">
                  <div className="flex justify-between">
                    <span className="font-['Bebas_Neue'] text-2xl text-white tracking-wider">Total</span>
                    <span className="font-['Bebas_Neue'] text-2xl text-[#e50914] tracking-wider">${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/checkout" onClick={toggleCart}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#e50914] hover:bg-[#c00812] text-white h-12 font-['Bebas_Neue'] text-xl tracking-[0.15em] uppercase transition-all border-2 border-[#e50914] hover:border-white"
                  >
                    Checkout
                  </motion.button>
                </Link>
                <Link to="/shop" onClick={toggleCart}>
                  <button className="w-full border-2 border-gray-700 hover:border-[#e50914] text-white h-12 font-['Oswald'] text-sm tracking-widest uppercase transition-all">
                    Continue Shopping
                  </button>
                </Link>
              </div>

              {orderSummary.subtotal < 100 && (
                <div className="flex items-center gap-2 p-3 bg-[#1a1a1a] border-l-4 border-[#e50914]">
                  <Package className="w-5 h-5 text-[#e50914] flex-shrink-0" />
                  <p className="text-xs text-gray-400 font-['Roboto_Condensed']">
                    Add <span className="text-[#e50914] font-bold">${(100 - orderSummary.subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
