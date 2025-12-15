import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Truck, Recycle } from 'lucide-react';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/products';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const HomePage: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  const newProducts = products.filter(product => product.new).slice(0, 3);

  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Carefully crafted with the finest materials for lasting durability'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary shipping on all orders over $100 worldwide'
    },
    {
      icon: Recycle,
      title: 'Sustainable',
      description: 'Committed to ethical production and eco-friendly practices'
    }
  ];

  return (
    <div className="overflow-hidden bg-[--bg]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[--bg]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="kampala city.jpg"
            alt="Fashion Hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[--bg] via-[--bg]/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-[--accent] font-['Oswald'] tracking-[0.3em] uppercase text-sm mb-4 block">
                Axios Apparel
              </span>
            </motion.div>
            <h1 className="font-['Bebas_Neue'] text-7xl md:text-8xl lg:text-9xl text-[--fg] mb-8 leading-[0.9] tracking-wider">
              Confidence
              <br />
              <span className="text-[--accent]">In Motion</span>
            </h1>
            <p className="text-xl md:text-2xl text-[--accent] mb-12 max-w-2xl leading-relaxed font-['Roboto_Condensed']">
              Premium streetwear that defines the modern urbanite. Quality, style, and sustainability in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-[--accent] hover:opacity-90 text-[--accent] font-['Bebas_Neue'] text-2xl tracking-[0.15em] uppercase transition-all border-2 border-[--accent] hover:border-[--accent] flex items-center gap-3"
                >
                  Shop Collection
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
              <Link to="/about">
                <button className="px-10 py-4 border-2 border-[--accent] hover:border-[--accent] text-[--fg] font-['Oswald'] text-lg tracking-widest uppercase transition-all">
                  Our Story
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-14 border-2 border-[--fg]/30 flex justify-center">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-4 bg-[#e50914] mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[--bg] border-t-2 border-[--bg-secondary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 border-4 border-[--bg-secondary] group-hover:border-[--accent] flex items-center justify-center mx-auto mb-6 transition-all">
                  <feature.icon className="w-10 h-10 text-[--accent] group-hover:text-[--accent] transition-colors" />
                </div>
                <h3 className="font-['Bebas_Neue'] text-3xl text-[--fg] mb-3 tracking-wider uppercase">{feature.title}</h3>
                <p className="text-[--accent] leading-relaxed font-['Roboto_Condensed']">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-[--bg] border-t-2 border-[--bg-secondary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[--accent] font-['Oswald'] tracking-[0.3em] uppercase text-sm mb-4 block">
              Featured Collection
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-6xl text-[--fg] mb-6 tracking-wider">Most Popular</h2>
            <p className="text-[--accent] text-lg max-w-2xl mx-auto font-['Roboto_Condensed']">
              Discover our most popular pieces, carefully curated for the modern wardrobe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/shop">
              <button className="px-10 py-4 border-2 border-[--border-color] hover:border-[--accent] text-[--fg] font-['Oswald'] text-lg tracking-widest uppercase transition-all inline-flex items-center gap-3">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 bg-[--bg] border-t-2 border-[--bg-secondary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[--accent] font-['Oswald'] tracking-[0.3em] uppercase text-sm mb-4 block">
              Just Dropped
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-6xl text-[--fg] mb-6 tracking-wider">New Arrivals</h2>
            <p className="text-[--accent] text-lg max-w-2xl mx-auto font-['Roboto_Condensed']">
              Fresh drops from our latest collection, available now.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[--accent] border-y-2 border-[--accent]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-6xl text-[--accent] mb-6 tracking-wider">
              Join the Axios Community
            </h2>
            <p className="text-[--accent]/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-['Roboto_Condensed']">
              Be the first to know about new drops, exclusive sales, and style inspiration. 
              Join thousands of urban fashion enthusiasts worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <button className="px-10 py-4 bg-[accent] text-[--accent] hover:bg-[--bg] hover:text-[--accent] font-['Bebas_Neue'] text-2xl tracking-[0.15em] uppercase transition-all border-2 border-[--accent] hover:border-white inline-flex items-center gap-3">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/blog">
                <button className="px-10 py-4 border-2 border-[--accent] text-[--accent] hover:bg-[--accent] hover:text-[--accent] font-['Oswald'] text-lg tracking-widest uppercase transition-all">
                  Read Our Stories
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-[--bg] border-t-2 border-[--bg-secondary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-[--accent] text-[--accent]" />
              ))}
            </div>
            <h3 className="font-['Bebas_Neue'] text-4xl text-[--fg] mb-3 tracking-wider">4.8/5 Customer Rating</h3>
            <p className="text-[--accent] font-['Roboto_Condensed']">
              Based on 2,500+ verified reviews from satisfied customers worldwide
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
