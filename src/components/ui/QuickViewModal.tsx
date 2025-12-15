import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Plus, Minus, Star, Heart, ShoppingBag,
  Package, TruckIcon
} from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './dialog';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const { addToCart } = useCart();

  // 🧼 Safe initialize when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
      setCurrentImage(product.image || '');
      setQuantity(1);
      setIsWishlisted(false);
    }
  }, [product]);

  // 🖼 Switch image when color changes
  useEffect(() => {
    if (product?.colorImages?.[selectedColor]) {
      setCurrentImage(product.colorImages[selectedColor]);
    } else {
      setCurrentImage(product?.image || '');
    }
  }, [selectedColor, product]);

  // 🖼 Preload color images to avoid flicker
  useEffect(() => {
    if (product?.colorImages) {
      Object.values(product.colorImages).forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product!, selectedSize, selectedColor, quantity);
      onClose();
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 100)) {
      setQuantity(newQuantity);
    }
  };

  const getColorClass = (color: string) => {
    const map: Record<string, string> = {
      white: 'bg-white border-gray-600',
      black: 'bg-black border-gray-600',
      red: 'bg-[#e50914]',
      'army green': 'bg-green-800',
      'steel blue': 'bg-blue-600',
      silver: 'bg-gray-300',
      navy: 'bg-blue-900',
      beige: 'bg-amber-100',
      gray: 'bg-gray-400',
    };
    return map[color.toLowerCase()] || 'bg-gray-500';
  };

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        className="max-w-8xl w-full max-h-[95vh] 
                   bg-[var(--bg,#0d0d0d)] text-[var(--text,#ffffff)] 
                   p-0 overflow-hidden border border-[#1a1a1a] 
                   rounded-lg shadow-2xl transition-all duration-300 ease-in-out"
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">Quick view of product</DialogDescription>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
          {/* IMAGE SECTION */}
          <div className="relative flex items-center justify-center bg-[#1a1a1a] p-4 min-h-[400px] lg:min-h-[800px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentImage}-${selectedColor}`}
                src={currentImage}
                alt={product.name}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="object-contain w-full max-h-[800px] h-auto rounded-lg shadow-xl"
              />
            </AnimatePresence>

            {/* BADGES */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 text-sm">
              {product.new && (
                <span className="bg-white text-black px-3 py-1 font-bold tracking-wider rounded">NEW</span>
              )}
              {product.sale && discount > 0 && (
                <span className="bg-[#e50914] text-white px-3 py-1 font-bold tracking-wider rounded">
                  -{discount}%
                </span>
              )}
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center 
                         rounded-full bg-white/10 hover:bg-[#e50914] transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* WISHLIST */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`absolute bottom-2.5 right-4 w-10 h-10 flex items-center justify-center rounded-full border transition
                ${isWishlisted ? 'bg-[#e50914] border-[#e50914]' : 'bg-white/10 border-white/20 hover:border-[#e50914]'}`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* DETAILS SECTION */}
          <div className="flex flex-col p-6 lg:p-8 overflow-y-auto max-h-[108vh] bg-[#1a1a1a]">
            <h2 className="text-l lg:text-3xl font-['Bebas_Neue'] tracking-wide uppercase mb-2">
              {product.name}
            </h2>
            <p className="text-gray-400 text-sm mb-2">{product.description}</p>

            <div className="flex flex-wrap items-baseline gap-3 mb-6">
              <span className="text-xl lg:text-4xl font-bold text-[#e50914]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-sm text-[#e50914] font-bold">
                    SAVE ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* SIZE SELECT */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <h4 className="text-gray-400 uppercase text-xs mb-2">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 text-sm uppercase rounded transition 
                        ${selectedSize === size
                          ? 'bg-[#e50914] border-[#e50914] text-white'
                          : 'border-gray-600 text-gray-300 hover:border-[#e50914]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COLOR SELECT */}
            {product.colors.length > 0 && (
              <div className="mb-4">
                <h4 className="text-gray-400 uppercase text-xs mb-2">Color</h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${getColorClass(color)} ${
                        selectedColor === color
                          ? 'border-[#e50914] ring-2 ring-[#e50914]'
                          : 'border-gray-700'
                      }`}
                      title={color}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY SELECT */}
            <div className="mb-6">
              <h4 className="text-gray-400 uppercase text-xs mb-2">Quantity</h4>
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-700 rounded">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#e50914] disabled:opacity-40 rounded-l"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 h-4 flex items-center justify-center text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 100)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#e50914] disabled:opacity-40 rounded-r"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stock && (
                  <span className="text-sm text-gray-500">{product.stock} available</span>
                )}
              </div>
            </div>

            {/* ADD TO CART */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-[#e50914] hover:bg-[#c00812] text-white text-lg uppercase 
                         tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 rounded"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </motion.button>

            {/* EXTRA INFO */}
            <div className="mt-6 space-y-2 text-gray-400 text-sm">
              {/* <div className="flex gap-2 items-center">
                <TruckIcon className="w-2 h-2 text-[#e50914]" />
                Free shipping on orders over $100
              </div> */}
              {/* <div className="flex gap-2 items-center">
                <Package className="w-2 h-2 text-[#e50914]" />
                30-day return policy
              </div> */}
              <div className="flex gap-2 items-center">
                <Star className="w-2 h-2 text-[#e50914]" />
                100% Authentic
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
