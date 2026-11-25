import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  reservationCode: string; // e.g. NCR-849201
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm e.g. '14:30'
  guestCount: number;
  tableNumber?: string;
  seatingArea: 'Main Hall' | 'Courtyard Atrium' | 'North Reading Corner' | 'Slow Bar';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    reservationCode: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },
    date: { type: String, required: true, index: true }, // Format: YYYY-MM-DD
    timeSlot: { type: String, required: true, index: true }, // Format: HH:mm
    guestCount: { type: Number, required: true, min: 1, max: 20 },
    tableNumber: { type: String, default: '' },
    seatingArea: {
      type: String,
      enum: ['Main Hall', 'Courtyard Atrium', 'North Reading Corner', 'Slow Bar'],
      default: 'Main Hall',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
      index: true,
    },
    specialRequests: { type: String, default: '' },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Compound index to quickly find conflicts
ReservationSchema.index({ date: 1, timeSlot: 1, tableNumber: 1 });
ReservationSchema.index({ date: 1, status: 1 });

export const Reservation = mongoose.model<IReservation>('Reservation', ReservationSchema);
