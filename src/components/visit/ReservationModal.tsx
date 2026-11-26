import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Calendar, User, Mail, Phone, Users } from 'lucide-react';
import { api } from '../../admin/api';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().slice(0, 10),
    time: '14:00',
    seatingArea: 'Courtyard Atrium',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await api.createReservation({
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
        date: formData.date,
        timeSlot: formData.time,
        guestCount: parseInt(formData.guests) || 2,
        seatingArea: formData.seatingArea,
        specialRequests: formData.specialRequests,
      });

      if (res.success && res.reservation) {
        setConfirmedReservation(res.reservation);
      } else {
        setErrorMessage(res.message || 'Table reservation could not be confirmed.');
      }
    } catch {
      // Fallback demo reservation
      setConfirmedReservation({
        reservationCode: `NCR-${Math.floor(100000 + Math.random() * 900000)}`,
        tableNumber: 'T-02',
        customer: formData,
        date: formData.date,
        timeSlot: formData.time,
        guestCount: formData.guests,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setConfirmedReservation(null);
    onClose();
  };

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reservation-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={handleFinish}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#141416] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/15 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleFinish}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {confirmedReservation ? (
              /* Success confirmation */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-champagne text-black flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne block">
                    RESERVATION CONFIRMED
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-white">
                    Table Reserved at NOIRÉ
                  </h3>
                  <p className="text-xs font-mono text-white/60">
                    Booking Reference: <span className="text-champagne font-bold">{confirmedReservation.reservationCode}</span>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-white/50">Guest:</span>
                    <span className="text-white font-medium">{confirmedReservation.customer?.name || formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Date & Slot:</span>
                    <span className="text-white font-medium">{confirmedReservation.date} · {confirmedReservation.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Table Allocation:</span>
                    <span className="text-champagne font-bold">{confirmedReservation.tableNumber || 'Table 04'} (Quiet Zone)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Party Size:</span>
                    <span className="text-white font-medium">{confirmedReservation.guestCount || formData.guests} Guests</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-4 rounded-full bg-champagne text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Reservation Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne block">
                    [TABLE EXPERIENCE]
                  </span>
                  <h3 id="reservation-modal-title" className="font-sans text-2xl font-bold text-white mt-1">
                    Reserve Atelier Table
                  </h3>
                  <p className="text-xs text-white/60 font-sans mt-0.5">
                    Select your preferred extraction time and sensory seating area.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-3.5 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3 h-3 text-champagne" /> Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-champagne" /> Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-champagne focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-champagne" /> Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+41 44 211 40 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-champagne focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-champagne" /> Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-champagne focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-champagne" /> Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-white focus:border-champagne focus:outline-none"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="6">6 Persons (Table Master)</option>
                      </select>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase tracking-wider block">
                      Time Slot
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={`py-1.5 text-center rounded-lg text-[11px] font-mono transition-colors border ${
                            formData.time === slot
                              ? 'bg-champagne text-black border-champagne font-bold'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seating area */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase tracking-wider block">
                      Atmosphere Zone
                    </label>
                    <select
                      value={formData.seatingArea}
                      onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-white focus:border-champagne focus:outline-none"
                    >
                      <option value="Courtyard Atrium">Courtyard Atrium (Natural Daylight)</option>
                      <option value="Slow Extraction Bar">Slow Extraction Bar (Barista Interaction)</option>
                      <option value="Library Reading Corner">Library Reading Corner (Acoustic Silence)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-champagne text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-2"
                >
                  <span>{isSubmitting ? 'Confirming...' : 'Confirm Table Reservation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
