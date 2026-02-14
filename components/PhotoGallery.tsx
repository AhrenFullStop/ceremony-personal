import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FOOTER_IMAGES } from '../constants';
import { GalleryImage } from '../types';

const PhotoItem: React.FC<{ image: GalleryImage }> = ({ image }) => {
  const controls = useAnimation();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleTap = () => {
    // Physical swing animation on the X-axis
    // Negative rotation pushes the bottom away (swings back)
    controls.start({
      rotateX: [-60, 45, -30, 15, -5, 0],
      transition: { duration: 2.5, ease: "linear" }
    });
  };

  // Intersection Observer for smart video playback
  React.useEffect(() => {
    if (image.type !== 'video' || !videoRef.current) return;

    const video = videoRef.current;

    // Intersection Observer to play/pause based on visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible, play it
            video.play().catch(() => {
              // Autoplay might be blocked, silently fail
            });
          } else {
            // Video is not visible, pause to save resources
            video.pause();
          }
        });
      },
      {
        // Start playing when 20% of the video is visible
        threshold: 0.2,
        // Add some margin to start loading slightly before visible
        rootMargin: '50px'
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [image.type]);

  return (
    <div 
      className="relative mx-6 w-56 shrink-0 cursor-pointer group" 
      style={{ perspective: "1000px" }} 
      onClick={handleTap}
    >
      {/* 
        The Pendulum: Includes the clip string and the photo.
        Pivots at the very top (where it touches the main string).
      */}
      <motion.div
        animate={controls}
        initial={{ rotate: image.rotation }} // Initial random Z tilt
        whileHover={{ zIndex: 10 }}
        className="origin-top" 
        style={{ transformStyle: "preserve-3d" }}
      >
         {/* The Peg/Clip at the top (Visual) */}
         <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-amber-900/80 z-20" />
         <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-800 shadow-sm z-30" />

         {/* The Vertical String */}
         <div className="mx-auto w-0.5 h-12 bg-amber-900/60" />

         {/* The Photo Card */}
         <div className="relative bg-white p-3 pb-8 shadow-lg hover:shadow-2xl transition-shadow rounded-sm transform-gpu">
           <div className="aspect-[3/4] overflow-hidden bg-gray-200">
            {image.type === 'video' ? (
              <video
                ref={videoRef}
                src={image.src}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                preload="metadata"
                playsInline
              />
            ) : (
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
            )}
           </div>
           
           {/* Tape effect */}
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/40 backdrop-blur-sm -rotate-1 shadow-sm" />
         </div>
      </motion.div>
    </div>
  );
};

const PhotoGallery: React.FC = () => {
  // Split images into two rows
  const mid = Math.ceil(FOOTER_IMAGES.length / 2);
  const row1 = FOOTER_IMAGES.slice(0, mid);
  const row2 = FOOTER_IMAGES.slice(mid);

  // Constants for animation
  // Item width (w-56 = ~224px) + margin (mx-6 = 48px) = 272px
  const ITEM_WIDTH = 272;
  const ROW1_WIDTH = row1.length * ITEM_WIDTH;
  const ROW2_WIDTH = row2.length * ITEM_WIDTH;

  // Duration: ~8s per item for a slow scroll
  const DURATION_PER_ITEM = 8;

  return (
    <section className="relative py-24 overflow-hidden bg-brand-dark/5">

      {/* Row 1 */}
      <div className="relative mb-32">
        {/* The Main String - Thicker and at the top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-900/70 shadow-sm z-10" />
        
        {/* Marquee */}
        <div className="flex overflow-hidden relative z-20 pt-1">
          <motion.div 
            className="flex pl-4"
            animate={{ x: [0, -ROW1_WIDTH] }}
            transition={{ duration: row1.length * DURATION_PER_ITEM, repeat: Infinity, ease: "linear" }}
          >
            {[...row1, ...row1].map((img, i) => (
               <PhotoItem key={`r1-${img.id}-${i}`} image={img} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        {/* The Main String */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-900/70 shadow-sm z-10" />

        {/* Marquee */}
        <div className="flex overflow-hidden relative z-20 pt-1">
          <motion.div 
            className="flex pl-4"
            animate={{ x: [-ROW2_WIDTH, 0] }}
            transition={{ duration: row2.length * DURATION_PER_ITEM, repeat: Infinity, ease: "linear" }}
          >
            {[...row2, ...row2].map((img, i) => (
               <PhotoItem key={`r2-${img.id}-${i}`} image={img} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
