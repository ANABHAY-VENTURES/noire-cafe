import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Plus, 
  X 
} from 'lucide-react';
import { api } from '../api';

export const ReservationsSection: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newForm, setNewForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().slice(0, 10),
    timeSlot: '14:00',
    guestCount: 2,
    seatingArea: 'Main Hall',
    specialRequests: '',
  });

  const fetchReservations = async () => {
    try {
      const data = await api.getReservations({
        status: statusFilter === 'all' ? undefined : statusFilter,
        date: selectedDate || undefined,
      });
      if (data.success && data.reservations) {
        setReservations(data.reservations);
      }
    } catch (err) {
      console.warn('Using seeded reservations:', err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [statusFilter, selectedDate]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await api.updateReservationStatus(id, newStatus);
      if (res.success) {
        setReservations((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err: any) {
      alert('Error updating reservation: ' + err.message);
    }
  };

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.createReservation({
        customer: {
          name: newForm.name,
          phone: newForm.phone,
          email: newForm.email,
        },
        date: newForm.date,
        timeSlot: newForm.timeSlot,
        guestCount: parseInt(newForm.guestCount as any),
        seatingArea: newForm.seatingArea,
        specialRequests: newForm.specialRequests,
      });

      if (res.success) {
        alert(`Reservation ${res.reservation.reservationCode} confirmed for Table ${res.reservation.tableNumber}!`);
        setNewModalOpen(false);
        fetchReservations();
      } else {
        alert(res.message || 'Slot full or overlap conflict.');
      }
    } catch (err: any) {
      alert('Failed: ' + err.message);
    }
  };

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 03 / Sanctuary Table Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Table Reservations.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-espresso text-ivory text-xs font-mono uppercase tracking-wider hover:bg-caramel transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Date & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-mono uppercase text-espresso/70 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-caramel" />
            <span>Date:</span>
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-ivory-light border border-espresso/20 text-xs font-mono text-espresso focus:outline-none focus:border-caramel"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['all', 'confirmed', 'pending', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-espresso text-ivory font-medium shadow-sm'
                  : 'bg-ivory-light text-espresso/70 hover:bg-ivory-dark/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reservations Table */}
      <div className="rounded-2xl bg-ivory-light border border-espresso/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-espresso/5 border-b border-espresso/10 text-espresso/60 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Time</th>
                <th className="p-4">Guest</th>
                <th className="p-4">Party</th>
                <th className="p-4">Table</th>
                <th className="p-4">Area</th>
                <th className="p-4">Special Requests</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {reservations.length > 0 ? (
                reservations.map((res) => (
                  <tr key={res._id || res.reservationCode} className="hover:bg-ivory/60 transition-colors">
                    <td className="p-4 font-semibold text-espresso">{res.reservationCode}</td>
                    <td className="p-4 text-caramel font-semibold">
                      {res.timeSlot}
                    </td>
                    <td className="p-4 font-sans">
                      <div className="font-medium text-espresso">{res.customer?.name}</div>
                      <div className="text-[11px] text-espresso/60 font-mono">{res.customer?.phone}</div>
                    </td>
                    <td className="p-4">{res.guestCount} guests</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-espresso/5 border border-espresso/15 font-semibold text-espresso">
                        {res.tableNumber || 'Unassigned'}
                      </span>
                    </td>
                    <td className="p-4 text-espresso/80">{res.seatingArea}</td>
                    <td className="p-4 text-espresso/60 max-w-[200px] truncate">
                      {res.specialRequests || '—'}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${
                        res.status === 'confirmed'
                          ? 'bg-emerald-500/15 text-emerald-800'
                          : res.status === 'cancelled'
                          ? 'bg-red-500/15 text-red-800'
                          : 'bg-amber-500/15 text-amber-800'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      {res.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(res._id, 'confirmed')}
                          className="px-2.5 py-1 rounded bg-emerald-600 text-ivory text-[10px] hover:bg-emerald-700 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {res.status !== 'cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(res._id, 'cancelled')}
                          className="px-2.5 py-1 rounded bg-red-600/10 text-red-700 hover:bg-red-600 hover:text-ivory text-[10px] transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-espresso/50">
                    No reservations found for {selectedDate}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Booking Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 bg-espresso/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ivory border border-espresso/20 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-espresso/10">
              <h3 className="font-serif text-2xl font-medium text-espresso">New Table Booking</h3>
              <button onClick={() => setNewModalOpen(false)} className="p-2 text-espresso/60">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReservation} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-espresso/70">Guest Name</label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-espresso/70">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="+91..."
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-espresso/70">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    required
                    value={newForm.guestCount}
                    onChange={(e) => setNewForm({ ...newForm, guestCount: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-espresso/70">Date</label>
                  <input
                    type="date"
                    required
                    value={newForm.date}
                    onChange={(e) => setNewForm({ ...newForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-espresso/70">Time Slot</label>
                  <select
                    value={newForm.timeSlot}
                    onChange={(e) => setNewForm({ ...newForm, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-espresso/70">Seating Area</label>
                <select
                  value={newForm.seatingArea}
                  onChange={(e) => setNewForm({ ...newForm, seatingArea: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                >
                  <option value="Main Hall">Main Hall</option>
                  <option value="Courtyard Atrium">Courtyard Atrium</option>
                  <option value="North Reading Corner">North Reading Corner</option>
                  <option value="Slow Bar">Slow Bar</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-espresso/70">Special Requests</label>
                <textarea
                  rows={2}
                  value={newForm.specialRequests}
                  onChange={(e) => setNewForm({ ...newForm, specialRequests: e.target.value })}
                  placeholder="Notes, celebration, allergies..."
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-espresso text-ivory text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
