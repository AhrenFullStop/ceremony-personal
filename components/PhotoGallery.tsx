import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FOOTER_IMAGES } from '../constants';
import { GalleryImage } from '../types';

const PhotoItem: React.FC<{ image: GalleryImage }> = ({ image }) => {
  const controls = useAnimation();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleTap = () => {
    controls.start({
      rotateX: [-60, 45, -30, 15, -5, 0],
      transition: { duration: 2.5, ease: "linear" }
    });
  };

  // Intersection Observer for smart video playback
  React.useEffect(() => {
    if (image.type !== 'video' || !videoRef.current) return;

    const video = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [image.type]);

  return (
    <div 
      className="relative mx-6 w-56 shrink-0 cursor-pointer group" 
      style={{ perspective: "1000px" }} 
      onClick={handleTap}
    >
      <motion.div
        animate={controls}
        initial={{ rotate: image.rotation }}
        whileHover={{ zIndex: 10, scale: 1.05 }}
        className="origin-top" 
        style={{ transformStyle: "preserve-3d" }}
      >
         <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-amber-900/80 z-20" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-800 shadow-sm z-30" />
         <div className="mx-auto w-0.5 h-12 bg-amber-900/60" />

         <div className="relative bg-white p-3 pb-8 shadow-lg hover:shadow-2xl transition-shadow rounded-sm transform-gpu">
           <div className="aspect-[3/4] overflow-hidden bg-gray-200">
            {image.type === 'video' ? (
              <video
                ref={videoRef}
                src={image.src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="none"
              />
            ) : (
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            )}
          </div>
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/40 backdrop-blur-sm -rotate-1 shadow-sm" />
         </div>
      </motion.div>
    </div>
  );
};

const PhotoGallery: React.FC = () => {
  const mid = Math.ceil(FOOTER_IMAGES.length / 2);
  const row1 = FOOTER_IMAGES.slice(0, mid);
  const row2 = FOOTER_IMAGES.slice(mid);

  return (
    <section className="relative py-24 overflow-hidden bg-brand-dark/5">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee 60s linear infinite reverse;
        }
        /* Pause on hover for better UX */
        .hover-pause:hover .animate-marquee,
        .hover-pause:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* Row 1 */}
      <div className="relative mb-32 hover-pause">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-900/70 shadow-sm z-10" />
        <div className="flex overflow-hidden relative z-20 pt-1">
          <div className="flex pl-4 animate-marquee w-max will-change-transform">
            {[...row1, ...row1].map((img, i) => (
               <PhotoItem key={`r1-${img.id}-${i}`} image={img} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative hover-pause">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-900/70 shadow-sm z-10" />
        <div className="flex overflow-hidden relative z-20 pt-1">
          <div className="flex pl-4 animate-marquee-reverse w-max will-change-transform">
            {[...row2, ...row2].map((img, i) => (
               <PhotoItem key={`r2-${img.id}-${i}`} image={img} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
