import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import GlassCard from './GlassCard';
import { Send, Meh, PartyPopper } from 'lucide-react';

type RsvpStatus = 'idle' | 'dragging' | 'dropped-yes' | 'dropped-no';

const RsvpGame: React.FC = () => {
  const [status, setStatus] = useState<RsvpStatus>('idle');
  const [hoverZone, setHoverZone] = useState<'yes' | 'no' | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Animation controls for the character
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-10, 10]);

  // Threshold distance from center to trigger zone (in pixels)
  const THRESHOLD = 100;

  const handleDrag = () => {
    setStatus('dragging');
    const currentX = x.get();
    
    if (currentX < -THRESHOLD) {
      setHoverZone('yes');
    } else if (currentX > THRESHOLD) {
      setHoverZone('no');
    } else {
      setHoverZone(null);
    }
  };

  const handleDragEnd = () => {
    const currentX = x.get();
    
    if (currentX < -THRESHOLD) {
      // Dropped in YES zone (Left)
      setStatus('dropped-yes');
      setHoverZone(null);
      // Snap to center of the yes zone (approx -120px depending on layout, or just animate "celebration")
      controls.start({
        x: -140, 
        scale: [1, 1.2, 1],
        y: [0, -20, 0, -10, 0],
        transition: { duration: 0.5 }
      });
    } else if (currentX > THRESHOLD) {
      // Dropped in NO zone (Right)
      setStatus('dropped-no');
      setHoverZone(null);
      controls.start({
        x: 140,
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
      });
    } else {
      // Reset
      setStatus('idle');
      setHoverZone(null);
      controls.start({ x: 0, y: 0 });
    }
  };

  const resetGame = () => {
    setStatus('idle');
    setHoverZone(null);
    controls.start({ x: 0, y: 0, scale: 1 });
  };

  const generateWhatsAppLink = () => {
    const phone = "+27736772064"; // Placeholder phone number
    let text = "";
    if (status === 'dropped-yes') {
      text = "I'm RSVPing YES to the wedding! Dietary notes: [optional] - bringing the kids [yes/no]";
    } else {
      text = "I regret to say that I can't make it to your wedding.";
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-20 px-4 overflow-hidden min-h-[600px] flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blush via-gray-100 to-gray-200" />
      
      <div className="max-w-3xl w-full mx-auto text-center relative z-10">
        <h2 className="font-serif text-4xl mb-4 text-gray-800">Are you coming?</h2>
        <p className="font-sans text-gray-600 mb-12">Drag the character to your answer!</p>

        {/* Game Area */}
        <div ref={constraintsRef} className="relative h-64 md:h-80 w-full max-w-xl mx-auto rounded-3xl bg-white/20 backdrop-blur-sm border-2 border-white/40 shadow-inner flex justify-between items-center px-6 md:px-12">
          
          {/* YES Zone (Left) */}
          <div 
            className={`
              w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center
              transition-all duration-300 border-4 border-dashed
              ${hoverZone === 'yes' ? 'scale-110 bg-green-100/50 border-green-400' : 'bg-white/40 border-white/50'}
              ${status === 'dropped-yes' ? 'bg-green-200 border-green-500 scale-105 shadow-[0_0_20px_rgba(74,222,128,0.5)]' : ''}
            `}
          >
            <span className="text-3xl md:text-4xl">💃🕺</span>
             <span className="font-bold text-xs md:text-sm mt-2 text-green-800">GOING</span>
          </div>

          {/* Draggable Character */}
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x, rotate }}
            className="absolute left-0 right-0 mx-auto w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-2xl flex items-center justify-center text-4xl select-none z-20 touch-none"
          >
            {status === 'dropped-yes' ? '🥳' : 
             status === 'dropped-no' ? '👋' : 
                hoverZone === 'yes' ? '😎' :
                  hoverZone === 'no' ? '🥺' : '😶'}
          </motion.div>

          {/* NO Zone (Right) */}
          <div 
            className={`
              w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center
              transition-all duration-300 border-4 border-dashed
              ${hoverZone === 'no' ? 'scale-110 bg-red-100/50 border-red-400' : 'bg-white/40 border-white/50'}
              ${status === 'dropped-no' ? 'bg-red-200 border-red-500 scale-105 shadow-[0_0_20px_rgba(248,113,113,0.5)]' : ''}
            `}
          >
             <span className="text-3xl md:text-4xl">🛑</span>
             <span className="font-bold text-xs md:text-sm mt-2 text-red-800">NOT GOING</span>
          </div>
        </div>

        {/* Result Action */}
        {(status === 'dropped-yes' || status === 'dropped-no') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
             <GlassCard className="inline-block p-6">
               <p className="mb-4 text-lg font-medium">
                 {status === 'dropped-yes' ? "Yay! We can't wait!" : "Aw, we'll miss you!"}
               </p>
               <a 
                 href={generateWhatsAppLink()}
                 target="_blank"
                 rel="noreferrer"
                 className={`
                   inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 shadow-lg
                   ${status === 'dropped-yes' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}
                 `}
               >
                 {status === 'dropped-yes' ? <PartyPopper className="w-5 h-5"/> : <Meh className="w-5 h-5"/>}
                 <span>Send WhatsApp RSVP</span>
                 <Send className="w-4 h-4 ml-1" />
               </a>
             </GlassCard>
             
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RsvpGame;