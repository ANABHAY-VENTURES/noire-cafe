import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_PHOTOS } from '../../data/coffeeData';
import { GalleryPhoto } from '../../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const AtmosphereGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Architecture', 'Craft', 'Atmosphere', 'Extraction', 'Bakery'];

  const filteredPhotos = activeFilter === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeFilter);

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleNextPhoto = useCallback(() => {
    if (currentIndex >= 0 && filteredPhotos.length > 0) {
      const nextIdx = (currentIndex + 1) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[nextIdx]);
    }
  }, [currentIndex, filteredPhotos]);

  const handlePrevPhoto = useCallback(() => {
    if (currentIndex >= 0 && filteredPhotos.length > 0) {
      const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[prevIdx]);
    }
  }, [currentIndex, filteredPhotos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handleNextPhoto, handlePrevPhoto]);

  // Editorial captions
  const CAPTIONS: Record<string, string> = {
    g1: 'Monolithic Terrazzo Bar · Calibrated for silent workflow and gentle morning light reflection.',
    g2: 'Hand-Thrown Ceramic Dripper · Flatbed extraction engineered with Swiss stoneware for thermal preservation.',
    g3: 'Morning Solitude · North window lounge reserved for reading, contemplative design, and quiet cupping.',
    g4: 'Tactile Materials · Smoked alpine oak seating paired with Mediterranean olive greenery and linen acoustics.',
    g5: 'Synesso MVP Extraction · 9-bar saturated groupheads delivering silky single-estate crema down to 21.4% yield.',
    g6: 'Laminated Brioche · Freshly rolled with churned pasture butter and freshly stone-crushed green cardamom.',
    g7: 'Courtyard Light · Natural daylight filtering through raw linen drapery in the inner garden atrium.',
    g8: 'Kyoto Cold Extraction · Drop-by-drop slow immersion through hand-blown glass coils at a sustained 4°C.',
  };

  return (
    <section id="gallery" className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-champagne mb-3">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>[05 // VISUAL MONOGRAPH]</span>
            </div>
            <h2 data-reveal="heading" className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Atelier Atmosphere.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md font-sans font-light leading-relaxed">
            Constructed with acoustic silence in mind. Minimalist Swiss limestone, smoked alpine oak, and soft morning daylight.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 py-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all duration-300 border ${
                activeFilter === cat
                  ? 'bg-white text-black border-white font-bold shadow-md'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredPhotos.map((photo, index) => {
            const isTall = index === 0 || index === 4;
            const caption = CAPTIONS[photo.id] || photo.title;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#121214] border border-white/10 ${
                  isTall ? 'sm:row-span-2 aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt || photo.title}
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Corner Crosshair */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-champagne opacity-0 group-hover:opacity-100 transition-opacity">
                  [{String(index + 1).padStart(2, '0')}]
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-champagne block mb-1">
                      {photo.category}
                    </span>
                    <p className="text-xs font-sans text-white/80 line-clamp-1 group-hover:text-white">
                      {caption}
                    </p>
                  </div>
                  <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-champagne transition-colors shrink-0 ml-2" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 z-50 hidden sm:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 z-50 hidden sm:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt || selectedPhoto.title}
                className="max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/15"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block">
                  {selectedPhoto.category}
                </span>
                <p className="text-sm font-sans text-white/80 mt-1 max-w-lg">
                  {CAPTIONS[selectedPhoto.id] || selectedPhoto.title}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
