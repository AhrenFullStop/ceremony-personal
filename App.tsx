import React, { Suspense } from 'react';
import Hero from './components/Hero';

// Lazy load below-the-fold components
const EventDetails = React.lazy(() => import('./components/EventDetails'));
const MapSection = React.lazy(() => import('./components/MapSection'));
const RsvpGame = React.lazy(() => import('./components/RsvpGame'));
const PhotoGallery = React.lazy(() => import('./components/PhotoGallery'));
const Footer = React.lazy(() => import('./components/Footer'));

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

      <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading gallery...</div>}>
        <PhotoGallery />
      </Suspense>
      
      <div className="relative z-10">
        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading details...</div>}>
          <EventDetails />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading map...</div>}>
          <MapSection />
        </Suspense>

        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading RSVP...</div>}>
          <RsvpGame />
        </Suspense>

        <Suspense fallback={<div className="h-24 w-full flex items-center justify-center">Loading footer...</div>}>
          <Footer />
        </Suspense>
      </div>

    </main>
  );
}

export default App;