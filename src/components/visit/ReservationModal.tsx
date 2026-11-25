import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '2 Guests',
    date: '2026-11-25',
    time: '10:30 AM',
    experience: 'Slow Bar & Tasting Flight',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-ivory rounded-3xl p-6 sm:p-10 shadow-2xl border border-espresso/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-ivory-dark/60 text-espresso/70 hover:text-espresso hover:bg-ivory-dark transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-olive/20 text-olive mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl font-medium text-espresso">
                  Table Confirmed.
                </h3>
                <p className="text-xs text-espresso/70 font-mono max-w-xs mx-auto">
                  We look forward to welcoming you for your {formData.experience} on {formData.date} at {formData.time}.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-olive block mb-1">
                    NOIRÉ ZÜRICH · TABLE RESERVATION
                  </span>
                  <h3 className="font-serif text-3xl font-normal text-espresso">
                    Reserve Your Slow Bar Experience.
                  </h3>
                  <p className="text-xs text-espresso/70 font-sans mt-2">
                    For groups up to 4 guests at our dedicated pour-over stone counter.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Mia Lindqvist"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="mia@design.ch"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      >
                        <option>1 Guest (Solo Cupping)</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Time Slot
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      >
                        <option>08:30 AM · Morning Extraction</option>
                        <option>10:30 AM · High Noon Cupping</option>
                        <option>02:00 PM · Afternoon Filter</option>
                        <option>04:30 PM · Twilight Batch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Tasting Format
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      >
                        <option>Slow Bar & Tasting Flight</option>
                        <option>Signature Reserve Pairing</option>
                        <option>Architectural Reading Seating</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Complete Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
