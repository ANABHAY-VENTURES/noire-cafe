import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation.js';
import { generateReservationCode } from '../utils/idGenerator.js';
import { createNotification } from '../services/notificationService.js';

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer, date, timeSlot, guestCount, seatingArea = 'Main Hall', specialRequests } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      res.status(400).json({ success: false, message: 'Name and phone number are required.' });
      return;
    }

    if (!date || !timeSlot || !guestCount) {
      res.status(400).json({ success: false, message: 'Date, time slot, and guest count are required.' });
      return;
    }

    // Verify date is not in the past
    const reservationDate = new Date(`${date}T${timeSlot}:00`);
    if (isNaN(reservationDate.getTime())) {
      res.status(400).json({ success: false, message: 'Invalid date or time slot format.' });
      return;
    }

    // Check table capacity & overlap prevention
    // Maximum 8 concurrent tables per slot in sanctuary
    const existingReservationsCount = await Reservation.countDocuments({
      date,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (existingReservationsCount >= 8) {
      res.status(400).json({
        success: false,
        message: `All sanctuary tables are fully reserved for ${date} at ${timeSlot}. Please choose an alternate slot.`,
      });
      return;
    }

    // Automatically assign available table number (T-01 to T-08)
    const activeReservations = await Reservation.find({
      date,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    }).select('tableNumber');

    const occupiedTables = new Set(activeReservations.map((r) => r.tableNumber).filter(Boolean));
    let assignedTable = '';
    for (let i = 1; i <= 8; i++) {
      const tableId = `T-0${i}`;
      if (!occupiedTables.has(tableId)) {
        assignedTable = tableId;
        break;
      }
    }

    const reservationCode = generateReservationCode();

    const reservation = await Reservation.create({
      reservationCode,
      customer: {
        name: customer.name.trim(),
        email: (customer.email || '').trim().toLowerCase(),
        phone: customer.phone.trim(),
      },
      date,
      timeSlot,
      guestCount: Math.min(20, Math.max(1, parseInt(guestCount) || 2)),
      tableNumber: assignedTable,
      seatingArea,
      status: 'confirmed', // Auto-confirm if slot available
      specialRequests: specialRequests || '',
    });

    await createNotification({
      title: `Table Reserved: ${reservationCode}`,
      message: `${customer.name} booked for ${guestCount} guests on ${date} at ${timeSlot} (${assignedTable || seatingArea})`,
      type: 'reservation',
      targetRole: 'all',
      metadata: { reservationCode, date, timeSlot },
    });

    res.status(201).json({
      success: true,
      message: 'Table reservation confirmed successfully.',
      reservation,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, status, search } = req.query;

    const query: any = {};
    if (date) query.date = date;
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { reservationCode: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
      ];
    }

    const reservations = await Reservation.find(query).sort({ date: -1, timeSlot: 1 });

    res.json({
      success: true,
      reservations,
      count: reservations.length,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReservationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, tableNumber, adminNotes } = req.body;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      res.status(404).json({ success: false, message: 'Reservation not found.' });
      return;
    }

    if (status) reservation.status = status;
    if (tableNumber !== undefined) reservation.tableNumber = tableNumber;
    if (adminNotes !== undefined) reservation.adminNotes = adminNotes;

    await reservation.save();

    res.json({
      success: true,
      message: `Reservation ${reservation.reservationCode} updated.`,
      reservation,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSlotAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date } = req.query;
    if (!date) {
      res.status(400).json({ success: false, message: 'Date parameter required (YYYY-MM-DD).' });
      return;
    }

    const standardSlots = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    const reservations = await Reservation.find({
      date: date as string,
      status: { $in: ['pending', 'confirmed'] },
    }).select('timeSlot tableNumber');

    const slotCounts: Record<string, number> = {};
    for (const r of reservations) {
      slotCounts[r.timeSlot] = (slotCounts[r.timeSlot] || 0) + 1;
    }

    const availability = standardSlots.map((slot) => {
      const bookedCount = slotCounts[slot] || 0;
      const remaining = Math.max(0, 8 - bookedCount);
      return {
        slot,
        totalTables: 8,
        bookedTables: bookedCount,
        availableTables: remaining,
        isAvailable: remaining > 0,
      };
    });

    res.json({
      success: true,
      date,
      slots: availability,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
