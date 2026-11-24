import React, { useState } from 'react';
import { CONTACT_CONFIG } from '../../config/contactConfig';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Navigation, 
  Instagram, 
  Music2, 
  BookOpen, 
  Calendar 
} from 'lucide-react';

interface VisitSectionProps {
  onOpenReservation: () => void;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ onOpenReservation }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_CONFIG.address.fullFormatted);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="visit" className="py-24 md:py-36 px-6 md:px-12 bg-ivory-light border-y border-espresso/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-espresso/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
              06 / Coordinates & Sanctuary
            </span>
            <h2 data-reveal="heading" className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-espresso tracking-tight">
              Your corner of calm.
            </h2>
          </div>
          <p className="text-sm md:text-base text-espresso/70 max-w-md font-sans leading-relaxed">
            Situated on the historic Limmatquai. Designed for contemplative morning study, quiet dialogue, and slow coffee journeys.
          </p>
        </div>

        {/* Sophisticated Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-16 items-start">
          
          {/* Left Column: Details, Hours, Contacts & Socials */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Address & Direction Card */}
            <div className="p-8 rounded-3xl bg-ivory border border-espresso/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-espresso/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-caramel/15 flex items-center justify-center text-caramel">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-espresso">Zürich Sanctuary</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-olive">
                      Level 01 & Riverside
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-full hover:bg-espresso/5 text-espresso/60 hover:text-espresso transition-colors text-xs flex items-center gap-1 font-mono"
                  title="Copy address to clipboard"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-olive" />
                      <span className="text-[10px] text-olive font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="text-sm font-sans text-espresso font-medium">
                  {CONTACT_CONFIG.address.line1}
                </div>
                <div className="text-espresso/70">
                  {CONTACT_CONFIG.address.postalCode} {CONTACT_CONFIG.address.city}, {CONTACT_CONFIG.address.country}
                </div>
                <p className="text-[11px] text-olive font-mono pt-1">
                  {CONTACT_CONFIG.address.notes}
                </p>
              </div>

              {/* Telephone & Electronic Mail */}
              <div className="pt-4 border-t border-espresso/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-espresso/60 uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-olive" />
                    <span>Telephone</span>
                  </div>
                  <a
                    href={`tel:${CONTACT_CONFIG.phone.value}`}
                    className="text-xs font-sans text-espresso hover:text-caramel transition-colors font-medium"
                  >
                    {CONTACT_CONFIG.phone.display}
                  </a>
                </div>

                <div>
                  <div className="text-espresso/60 uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-olive" />
                    <span>Electronic Mail</span>
                  </div>
                  <a
                    href={CONTACT_CONFIG.email.value}
                    className="text-xs font-sans text-espresso hover:text-caramel transition-colors font-medium truncate block"
                  >
                    {CONTACT_CONFIG.email.display}
                  </a>
                </div>
              </div>

              {/* Reservation CTA */}
              <button
                onClick={onOpenReservation}
                className="w-full py-4 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Slow Bar Table</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Opening Hours Schedule */}
            <div className="p-8 rounded-3xl bg-ivory border border-espresso/10 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-espresso/10">
                <div className="w-9 h-9 rounded-full bg-olive/15 flex items-center justify-center text-olive">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-espresso">Extraction Hours</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-olive">
                    7 Days a Week
                  </span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-espresso/5">
                  <span className="text-espresso/70">Monday – Friday</span>
                  <span className="font-semibold text-espresso">{CONTACT_CONFIG.hours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-espresso/5">
                  <span className="text-espresso/70">Saturday</span>
                  <span className="font-semibold text-espresso">{CONTACT_CONFIG.hours.saturday}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-espresso/70">Sunday</span>
                  <span className="font-semibold text-espresso">{CONTACT_CONFIG.hours.sunday}</span>
                </div>
              </div>

              <div className="text-[11px] text-espresso/60 italic font-serif pt-1">
                {CONTACT_CONFIG.hours.kitchenNote}
              </div>
            </div>

            {/* Social Links Row */}
            <div className="p-6 rounded-2xl bg-ivory border border-espresso/10 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-espresso/60">
                Follow The Story
              </span>

              <div className="flex items-center gap-4">
                <a
                  href={CONTACT_CONFIG.socials[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-espresso/80 hover:text-caramel transition-colors"
                >
                  <Instagram className="w-4 h-4 text-caramel" />
                  <span>Instagram</span>
                </a>
                <span className="text-espresso/20">•</span>
                <a
                  href={CONTACT_CONFIG.socials[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-espresso/80 hover:text-caramel transition-colors"
                >
                  <Music2 className="w-4 h-4 text-caramel" />
                  <span>Acoustics</span>
                </a>
                <span className="text-espresso/20">•</span>
                <a
                  href={CONTACT_CONFIG.socials[2].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-espresso/80 hover:text-caramel transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-caramel" />
                  <span>Dispatch</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Google Maps Embed with Directions */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-espresso/15 shadow-xl bg-ivory flex flex-col">
              
              {/* Map Header Bar */}
              <div className="p-5 bg-ivory border-b border-espresso/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-espresso font-semibold">
                    INTERACTIVE CARTOGRAPHY · ZÜRICH 8001
                  </span>
                </div>

                <a
                  href={CONTACT_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso text-ivory text-xs font-mono uppercase tracking-wider hover:bg-caramel transition-colors group"
                >
                  <Navigation className="w-3.5 h-3.5 text-caramel group-hover:text-ivory transition-colors" />
                  <span>Get Directions in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Responsive Google Maps Iframe Embed */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-ivory-dark overflow-hidden">
                <iframe
                  title="NOIRÉ Café Location Map"
                  src={CONTACT_CONFIG.maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[0.85] contrast-[1.02]"
                />
              </div>

              {/* Map Footer Bar with Transit and Accessibility details */}
              <div className="p-6 bg-ivory-light border-t border-espresso/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-espresso/60 uppercase tracking-widest text-[10px] block mb-0.5">
                    PUBLIC TRANSIT
                  </span>
                  <span className="text-espresso">
                    Tram 4, 15 to Helmhaus (90m walk) · Limmat riverboat pier
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="text-espresso/60 uppercase tracking-widest text-[10px] block mb-0.5">
                    COORDINATES & ACCESSIBILITY
                  </span>
                  <span className="text-olive font-semibold">
                    {CONTACT_CONFIG.maps.coordinates} · Step-Free Entry
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
