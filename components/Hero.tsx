import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WEDDING_DATE, COUPLE_NAMES } from '../constants';
import GlassCard from './GlassCard';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Media - Parallax Effect */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img 
          src="/hero.webp" 
          alt="Ahren and Reem" 
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-brand-dark/20" />
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 px-4 w-full max-w-lg mx-auto text-center">
        <GlassCard className="p-8 md:p-12 flex flex-col items-center gap-6 overflow-hidden group">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-[100%] group-hover:animate-none animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />
          
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-tight">
              {COUPLE_NAMES}
            </h1>
          </motion.div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-800/40 my-2" />
            <p className="font-sans text-lg md:text-xl tracking-widest text-gray-800 uppercase">
              {WEDDING_DATE}
            </p>
            <div className="w-16 h-px bg-gray-800/40 my-2" />
          </motion.div>

          {/* Geometric Shimmer Motif */}
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </GlassCard>
      </motion.div>
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;