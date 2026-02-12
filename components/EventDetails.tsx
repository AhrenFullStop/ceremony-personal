import React from 'react';
import { TIMELINE, LOCATION_NAME, LOCATION_LINK } from '../constants';
import GlassCard from './GlassCard';
import { Sun, MapPin, Clock } from 'lucide-react';

const EventDetails: React.FC = () => {
  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto space-y-16">
      
      {/* Intro / Location Note */}
      <GlassCard className="p-8 text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-4xl mb-6 text-gray-800">The Celebration</h2>
        <div className="space-y-4 font-sans text-gray-700">
          <a 
            href={LOCATION_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 text-lg font-medium hover:text-brand-gold transition-colors"
          >
            <MapPin className="w-5 h-5 text-brand-gold" />
            <span className="underline underline-offset-4 decoration-brand-gold/30">{LOCATION_NAME}</span>
          </a>
          <div className="flex flex-col items-center gap-2 p-4 bg-white/30 rounded-lg">
            <div className="flex items-center gap-2 text-brand-dark/80">
              <Sun className="w-5 h-5" />
              <span className="font-semibold">Weather Forecast</span>
            </div>
            <p className="italic text-sm">
              “Expected warm (≈27°C), but Cape Town can surprise us — bring a light layer.”
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent" />

        <div className="space-y-12">
          {TIMELINE.map((event, index) => (
            <div key={index} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for desktop layout balance */}
              <div className="hidden md:block w-5/12" />

              {/* Time Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-[5px] w-3 h-3 rounded-full bg-white border-2 border-gray-400 z-10" />

              {/* Content Card */}
              <div className="pl-12 md:pl-0 w-full md:w-5/12">
                <GlassCard delay={index * 0.1} className="p-6 hover:bg-white/50 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2 text-brand-gold">
                    <Clock className="w-4 h-4" />
                    <span className="font-sans font-bold text-sm tracking-wide">{event.time}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 mb-1">{event.title}</h3>
                  {event.description && (
                    <p className="font-sans text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  )}
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;