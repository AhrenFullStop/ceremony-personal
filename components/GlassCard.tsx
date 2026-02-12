import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`
        relative overflow-hidden
        bg-white/40 backdrop-blur-md 
        border border-white/40 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
        rounded-2xl
        ${className}
      `}
    >
      {/* Subtle shine effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-20" />
      
      {children}
    </motion.div>
  );
};

export default GlassCard;