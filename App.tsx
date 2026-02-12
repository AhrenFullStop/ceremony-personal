import React from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import MapSection from './components/MapSection';
import RsvpGame from './components/RsvpGame';
import FooterGallery from './components/FooterGallery';

function App() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] text-gray-900 selection:bg-brand-gold/30">
      
      {/* 
        Fixed background texture/gradient for depth 
        Using a very subtle noise pattern or gradient mesh could enhance glassmorphism 
      */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] mix-blend-multiply filter" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-200/30 rounded-full blur-[100px] mix-blend-multiply filter" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-100/30 rounded-full blur-[120px] mix-blend-multiply filter" />
      </div>

      <Hero />
      
      <div className="relative z-10">
        <EventDetails />
        <MapSection />
        <RsvpGame />
        <FooterGallery />
      </div>

    </main>
  );
}

export default App;