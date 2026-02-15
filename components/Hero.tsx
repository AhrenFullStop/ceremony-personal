import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col items-center bg-white pt-20 md:pt-32 overflow-hidden">

      {/* Text Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 mb-12 md:mb-20 w-full"
      >
        <h1 className="font-serif text-[5rem] leading-[0.9] md:text-[8rem] lg:text-[11rem] text-gray-900 tracking-tight md:tracking-normal">
          <span className="block md:inline">Ahren &</span>
          <br className="md:hidden" />
          <span className="block md:inline"> Reem</span>
        </h1>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-8 font-serif text-xl md:text-2xl text-gray-600 tracking-wide font-light">
          <span className="uppercase tracking-widest md:normal-case md:tracking-wide">Cape Town</span>
          <span className="hidden md:inline text-gray-400">—</span>
          <span className="md:hidden h-12 w-px bg-gray-900/20"></span>
          <span>Saturday 18 April</span>
        </div>
      </motion.div>

      {/* Parallax Image */}
      <div className="w-full md:max-w-[85vw] lg:max-w-6xl h-[50vh] md:h-[85vh] relative overflow-hidden px-4 md:px-0">
        <motion.div 
          style={{ y }}
          className="w-full h-[120%] relative -top-[10%]"
        >
          <img
            src="/hero.webp"
            alt="Ahren and Reem walking by the water in Cape Town"
            className="w-full h-full object-cover grayscale"
          />
          {/* Subtle overlay for depth if needed, currently clean as per design */}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 md:hidden" />
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;