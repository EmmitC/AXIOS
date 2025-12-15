import React from 'react';
import { motion } from 'motion/react';
import { Users, Leaf, Award, Heart, Target, Globe } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'Every piece we create serves a purpose in the modern urban lifestyle'
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'Committed to ethical production and environmentally conscious practices'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Premium materials and craftsmanship in every detail'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a global community of urban fashion enthusiasts'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '200+', label: 'Products Created' },
    { number: '25+', label: 'Countries Served' },
    { number: '4.8', label: 'Average Rating' }
  ];

  const team = [
    {
      name: 'Emmit Christopher',
      role: 'Founder & CEO',
      image: './',
      bio: 'Passionate about merging urban culture with sustainable fashion.'
    },
    {
      name: 'Grace Atim',
      role: 'Head of Sustainability',
      image: './',
      bio: 'Environmental advocate leading our sustainable fashion initiatives.'
    },
    {
      name: 'Yalle Shawn',
      role: 'Brand Director',
      image: './',
      bio: 'Marketing strategist building the next generation of fashion brands.'
    },
    {
      name: 'Tumwesigye Clancy',
      role: 'Lead Designer',
      image: './',
      bio: 'Creative visionary behind our unique streetwear designs.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg[--bg] text[--accent]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="./"
            alt="Our Story"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-6xl lg:text-6xl font-bold mb-6">
              Redefining Urban
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block">
                Fashion
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text[--accent] leading-relaxed">
             Axios Apparel represents the next evolution of premium streetwear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg[--bg]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text[--accent] leading-relaxed">
                <p>
                  Founded in 2019 by a collective of designers, artists, and urban culture enthusiasts, 
                  Axios Apparel emerged from a simple vision: to create premium streetwear that doesn't 
                  compromise on quality, sustainability, or style.
                </p>
                <p>
                  Starting from a small studio in Brooklyn, we've grown into a global brand while 
                  maintaining our core values of authenticity, quality, and community. Every piece 
                  we create tells a story of urban resilience and creative expression.
                </p>
                <p>
                  Today, Axios Apparel represents more than just clothing – we're a movement that 
                  celebrates the diverse, dynamic culture of modern urban life while pushing the 
                  boundaries of sustainable fashion.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="./"
                  alt="Our workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg[--bg]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text[--accent] text-lg max-w-2xl mx-auto">
              The principles that guide everything we do, from design to delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <value.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text[--accent] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg[--bg] text[--accent]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">By the Numbers</h2>
            <p className="text[--accent] text-lg">
              Our impact on the global fashion community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text[--accent]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg[--bg]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet the Team</h2>
            <p className="text[--accent] text-lg max-w-2xl mx-auto">
              The creative minds behind Axios Apparel's vision and mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 mx-auto max-w-xs">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</div>
                <p className="text[--accent] leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg[--bg]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Globe className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text[--accent] leading-relaxed mb-8">
              To create premium streetwear that empowers self-expression while building a more 
              sustainable and inclusive fashion industry. We believe that great style shouldn't 
              come at the expense of our planet or our communities.
            </p>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
              <p className="text-blue-100">
                Every purchase supports our mission to create positive change in the fashion industry. 
                Together, we're building a more sustainable future, one piece at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;