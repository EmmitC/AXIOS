import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from './button';
import QuickViewModal from './QuickViewModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const openQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'white': 'bg-white border-gray-600',
      'black': 'bg-black border-gray-600',
      'grey': 'bg-gray-400',
      'gray': 'bg-gray-400',
      'red': 'bg-[#e50914]',
      'army green': 'bg-green-800',
      'steel blue': 'bg-blue-600',
      'silver': 'bg-gray-300',
    };
    
    const normalizedColor = color.toLowerCase();
    return colorMap[normalizedColor] || 'bg-gray-500';
  };

  return (
    <>
      <motion.div
        className="group relative bg-[--bg-secondary] border-2 border-[--bg-secondary] hover:border-[--accent] overflow-hidden transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-[--bg]">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.new && (
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white text-black px-3 py-1 font-['Bebas_Neue'] text-sm tracking-widest"
              >
                NEW
              </motion.span>
            )}
            {product.sale && discountPercentage > 0 && (
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-[--accent] text-white px-3 py-1 font-['Bebas_Neue'] text-sm tracking-widest"
              >
                -{discountPercentage}%
              </motion.span>
            )}
          </div>

          {/* Action Buttons Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openQuickView}
              className="w-12 h-12 bg-[--fg] text-[--bg] hover:bg-[--accent] hover:text-white flex items-center justify-center transition-all"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="w-12 h-12 bg-[--fg] text-[--bg] hover:bg-[--accent] hover:text-white flex items-center justify-center transition-all"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-2 transition-all z-10 ${
              isWishlisted 
                ? 'bg-[--accent] border-[--accent] text-white' 
                : 'bg-white/10 border-white/30 text-white hover:border-[--accent]'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-5 bg-[--bg-secondary]">
          {/* Category */}
          <span className="text-[--accent] font-['Oswald'] text-xs tracking-widest uppercase block mb-2">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-['Bebas_Neue'] text-2xl text-[--fg] uppercase mb-3 line-clamp-2 tracking-wider">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-[--accent] text-[--accent]'
                        : 'text-[--text-muted]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[--text-muted] text-xs font-['Roboto_Condensed']">
                ({product.reviews})
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-['Bebas_Neue'] text-3xl text-[--accent] tracking-wider">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-[--text-muted] line-through font-['Roboto_Condensed']">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-2 pt-3 border-t-2 border-[--bg]">
              <span className="text-xs text-[--text-muted] font-['Oswald'] tracking-wider uppercase">Colors:</span>
              <div className="flex gap-1.5">
                {product.colors.slice(0, 4).map((color) => (
                  <div
                    key={color}
                    className={`w-5 h-5 border-2 border-[--border-color] hover:border-[--accent] transition-all ${getColorClass(color)}`}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-[--text-muted] font-['Roboto_Condensed'] flex items-center">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
