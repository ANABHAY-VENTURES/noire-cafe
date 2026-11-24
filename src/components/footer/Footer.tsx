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
    <footer className="bg-espresso text-ivory pt-24 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-espresso/30">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-ivory/10 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-olive-light">
              THE NOIRÉ DISPATCH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory tracking-tight">
              Quiet releases, micro-harvest chronicles, and brewing notes directly to your inbox.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center rounded-full bg-ivory/10 border border-ivory/20 p-1.5 focus-within:border-caramel transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-transparent px-5 py-2.5 text-xs text-ivory placeholder-ivory/40 focus:outline-none w-full font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-caramel text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel-light transition-colors shrink-0 flex items-center gap-1.5"
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
              <span className="text-[10px] text-ivory/50 font-mono block pl-4">
                Strictly bi-monthly. No marketing noise. Unsubscribe anytime.
              </span>
            </form>
          </div>
        </div>

        {/* Middle Navigation & Information Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 border-b border-ivory/10 text-xs">
          
          {/* Col 1: Brand Info & Tagline */}
          <div className="col-span-2 lg:col-span-2 space-y-4 pr-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-ivory/30 flex items-center justify-center">
                <span className="font-serif text-sm font-semibold">N</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-medium tracking-tight block">
                  {CONTACT_CONFIG.cafeName}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-caramel block">
                  {CONTACT_CONFIG.tagline}
                </span>
              </div>
            </div>
            <p className="text-ivory/70 leading-relaxed max-w-sm font-sans font-light text-xs">
              Swiss specialty coffee house dedicated to precision extraction, contemplative design, and transparent direct-trade terroir.
            </p>
            <div className="text-[11px] font-mono text-olive-light">
              {CONTACT_CONFIG.address.fullFormatted}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-caramel mb-2">Navigation</div>
            <ul className="space-y-2.5 font-sans text-ivory/70">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-caramel transition-colors">
                  Home Sanctuary
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-caramel transition-colors">
                  Curated Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-caramel transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experience')} className="hover:text-caramel transition-colors">
                  The Craft Sequence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('specials')} className="hover:text-caramel transition-colors">
                  Cellar Specials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-caramel transition-colors">
                  Atmosphere Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="hover:text-caramel transition-colors">
                  Visit Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours Summary */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-caramel mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-olive-light" />
              <span>Opening Hours</span>
            </div>
            <ul className="space-y-2 font-mono text-[11px] text-ivory/70">
              <li>
                <span className="text-ivory/50 block">Mon – Fri</span>
                <span className="font-semibold text-ivory">{CONTACT_CONFIG.hours.weekdays}</span>
              </li>
              <li>
                <span className="text-ivory/50 block">Saturday</span>
                <span className="font-semibold text-ivory">{CONTACT_CONFIG.hours.saturday}</span>
              </li>
              <li>
                <span className="text-ivory/50 block">Sunday</span>
                <span className="font-semibold text-ivory">{CONTACT_CONFIG.hours.sunday}</span>
              </li>
              <li className="pt-1 text-[10px] text-olive-light font-serif italic">
                *Kitchen open until 16:00
              </li>
            </ul>
          </div>

          {/* Col 4: Hospitality & Booking */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-caramel mb-2">Hospitality</div>
            <ul className="space-y-2.5 font-sans text-ivory/70">
              <li>
                <button onClick={onOpenReservation} className="hover:text-caramel transition-colors underline underline-offset-4">
                  Table Reservations
                </button>
              </li>
              <li>
                <a href={CONTACT_CONFIG.email.value} className="hover:text-caramel transition-colors">
                  Private Cupping Sessions
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_CONFIG.phone.value}`} className="hover:text-caramel transition-colors">
                  Telephone Contact
                </a>
              </li>
              <li>Acoustic Workspace Policy</li>
              <li>Gift Cards & Beans</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Social Links, Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-ivory/50">
          <div>
            &copy; {new Date().getFullYear()} {CONTACT_CONFIG.cafeName.toUpperCase()}. All rights reserved. Crafted with slow reverence.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={CONTACT_CONFIG.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-caramel transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5 text-caramel" />
              <span>Instagram</span>
            </a>

            <a
              href={CONTACT_CONFIG.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-caramel transition-colors flex items-center gap-1.5 hidden md:flex"
            >
              <Music2 className="w-3.5 h-3.5 text-caramel" />
              <span>Acoustics</span>
            </a>

            <a
              href={CONTACT_CONFIG.socials[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-caramel transition-colors flex items-center gap-1.5 hidden md:flex"
            >
              <BookOpen className="w-3.5 h-3.5 text-caramel" />
              <span>Dispatch</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-caramel transition-colors uppercase tracking-widest"
              aria-label="Back to top"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
