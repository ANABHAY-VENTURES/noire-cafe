import React, { useState } from 'react';
import { ArrowUp, ArrowRight, Instagram, Check, Clock, Music2, BookOpen } from 'lucide-react';
import { CONTACT_CONFIG } from '../../config/contactConfig';

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReservation }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080809] text-white pt-24 pb-12 px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-white/10">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne">
              [THE NOIRÉ DISPATCH]
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Quiet releases, micro-harvest chronicles, and brewing notes directly to your inbox.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center rounded-full bg-white/5 border border-white/15 p-1.5 focus-within:border-champagne transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-transparent px-5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none w-full font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-champagne text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              <span className="text-[10px] text-white/40 font-mono block pl-4">
                Strictly bi-monthly. No marketing noise. Unsubscribe anytime.
              </span>
            </form>
          </div>
        </div>

        {/* Middle Navigation & Information Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 border-b border-white/10 text-xs">
          
          {/* Col 1: Brand Info & Tagline */}
          <div className="col-span-2 lg:col-span-2 space-y-4 pr-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-champagne/40 bg-white/5 flex items-center justify-center">
                <span className="font-serif text-sm font-semibold text-champagne">N</span>
              </div>
              <div>
                <span className="font-sans text-xl font-bold tracking-[0.2em] text-white uppercase block">
                  {CONTACT_CONFIG.cafeName}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-champagne block">
                  {CONTACT_CONFIG.tagline}
                </span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm font-sans font-light text-xs">
              Swiss specialty coffee atelier dedicated to precision extraction, contemplative design, and transparent direct-trade terroir.
            </p>
            <div className="text-[10px] font-mono text-white/50">
              {CONTACT_CONFIG.address.fullFormatted}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-2">Navigation</div>
            <ul className="space-y-2.5 font-mono text-xs text-white/60">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-champagne transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-champagne transition-colors">
                  Curated Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-champagne transition-colors">
                  Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experience')} className="hover:text-champagne transition-colors">
                  The Craft Sequence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('specials')} className="hover:text-champagne transition-colors">
                  Cellar Specials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-champagne transition-colors">
                  Atmosphere Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="hover:text-champagne transition-colors">
                  Visit Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-champagne hover:underline transition-colors flex items-center gap-1 font-mono text-[11px] pt-1">
                  <span>✦ Operations Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours Summary */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-champagne" />
              <span>Extraction Hours</span>
            </div>
            <ul className="space-y-2 font-mono text-[11px] text-white/60">
              <li>
                <span className="text-white/40 block">Mon – Fri</span>
                <span className="font-semibold text-white">{CONTACT_CONFIG.hours.weekdays}</span>
              </li>
              <li>
                <span className="text-white/40 block">Saturday</span>
                <span className="font-semibold text-white">{CONTACT_CONFIG.hours.saturday}</span>
              </li>
              <li>
                <span className="text-white/40 block">Sunday</span>
                <span className="font-semibold text-white">{CONTACT_CONFIG.hours.sunday}</span>
              </li>
              <li className="pt-1 text-[10px] text-champagne/80 font-serif italic">
                *Kitchen open until 16:00
              </li>
            </ul>
          </div>

          {/* Col 4: Hospitality & Booking */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-2">Hospitality</div>
            <ul className="space-y-2.5 font-sans text-xs text-white/60">
              <li>
                <button onClick={onOpenReservation} className="hover:text-champagne transition-colors underline underline-offset-4">
                  Table Reservations
                </button>
              </li>
              <li>
                <a href={CONTACT_CONFIG.email.value} className="hover:text-champagne transition-colors">
                  Private Cupping Sessions
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_CONFIG.phone.value}`} className="hover:text-champagne transition-colors">
                  Telephone Contact
                </a>
              </li>
              <li>Acoustic Workspace Policy</li>
              <li>Gift Cards & Beans</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Social Links, Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/40">
          <div>
            &copy; {new Date().getFullYear()} {CONTACT_CONFIG.cafeName.toUpperCase()} ATELIER. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={CONTACT_CONFIG.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-champagne transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5 text-champagne" />
              <span>Instagram</span>
            </a>

            <a
              href={CONTACT_CONFIG.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-champagne transition-colors flex items-center gap-1.5 hidden md:flex"
            >
              <Music2 className="w-3.5 h-3.5 text-champagne" />
              <span>Acoustics</span>
            </a>

            <a
              href={CONTACT_CONFIG.socials[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-champagne transition-colors flex items-center gap-1.5 hidden md:flex"
            >
              <BookOpen className="w-3.5 h-3.5 text-champagne" />
              <span>Dispatch</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-champagne transition-colors uppercase tracking-widest"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
