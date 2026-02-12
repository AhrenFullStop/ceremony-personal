import React from 'react';
import GlassCard from './GlassCard';
import { LOCATION_MAP_URL, LOCATION_LINK, VILLA_IMAGES } from '../constants';
import { motion } from 'framer-motion';

const MapSection: React.FC = () => {
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
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...VILLA_IMAGES, ...VILLA_IMAGES, ...VILLA_IMAGES].map((img, idx) => (
                <div 
                  key={idx}
                  className="shrink-0 w-64 h-48 overflow-hidden rounded-xl shadow-md"
                >
                  <img src={img} alt="Villa View" className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MapSection;