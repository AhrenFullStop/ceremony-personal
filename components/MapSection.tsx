import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { LOCATION_MAP_URL, LOCATION_LINK, VILLA_IMAGES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const MapSection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Google Map Embed */}
        <GlassCard className="h-[400px] lg:h-[500px] min-h-[400px] p-2">
          <iframe 
            src={LOCATION_MAP_URL}
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '0.75rem', filter: 'grayscale(0.2) contrast(1.1) opacity(0.9)' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location"
          ></iframe>
        </GlassCard>

        {/* Villa Photos & Details */}
        <div className="flex flex-col gap-8 justify-center h-full">
          <GlassCard className="p-8 text-center flex flex-col items-center">
            <h3 className="font-serif text-3xl mb-4">The Venue</h3>
            <p className="font-sans text-gray-700 leading-relaxed mb-6">
              Nestled in the heart of Bishopscourt, the villa offers lush gardens and breathtaking mountain views. 
              We can't wait to share this magical space with you.
            </p>
            <a 
              href={LOCATION_LINK} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-8 py-4 bg-gray-900 text-white font-sans text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
            >
              Open in Google Maps
            </a>
          </GlassCard>

          {/* Carousel */}
          <div className="w-full overflow-hidden relative rounded-2xl">
            <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] rounded-2xl" />
            <motion.div 
              className="flex gap-4"
              animate={{ x: [0, -272 * VILLA_IMAGES.length] }} // 272px = w-64 (256px) + gap-4 (16px)
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {[...VILLA_IMAGES, ...VILLA_IMAGES, ...VILLA_IMAGES].map((img, idx) => (
                <div 
                  key={idx}
                  className="shrink-0 w-64 h-48 overflow-hidden rounded-xl shadow-md cursor-zoom-in"
                  onClick={() => setSelectedImageIndex(idx % VILLA_IMAGES.length)}
                >
                  <img src={img} alt="Villa View" className="w-full h-full object-cover pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImageIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + VILLA_IMAGES.length) % VILLA_IMAGES.length : null));
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % VILLA_IMAGES.length : null));
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={VILLA_IMAGES[selectedImageIndex]}
              alt="Villa Full View"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MapSection;