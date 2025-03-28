// This file serves as a central data store for our API routes
// Now using MongoDB instead of file-based storage
import dbConnect from '@/lib/mongoose';
import TimeSlotModel from '@/models/TimeSlot';
import ReservationModel from '@/models/Reservation';

// Initial time slot data (used only for seeding the database)
const initialTimeSlots = [
  { id: "1", time: "10:00am - 11:00am", capacity: 8, registered: 0, available: 8 },
  { id: "2", time: "11:30am - 12:30pm", capacity: 8, registered: 0, available: 8 },
  { id: "3", time: "1:00pm - 2:00pm", capacity: 8, registered: 0, available: 8 },
  { id: "4", time: "2:30pm - 3:30pm", capacity: 8, registered: 0, available: 8 },
];

// Function to get all time slots
export async function getTimeSlots() {
  await dbConnect();
  
  // Check if we need to seed the database
  const count = await TimeSlotModel.countDocuments();
  
  if (count === 0) {
    // Seed the database with initial time slots
    await TimeSlotModel.insertMany(initialTimeSlots);
  }
  
  // Return all time slots
  return await TimeSlotModel.find({}).lean();
}

// Function to get a specific time slot
export async function getTimeSlot(id: string) {
  await dbConnect();
  return await TimeSlotModel.findOne({ id }).lean();
}

// Function to update a time slot
export async function updateTimeSlot(id: string, data: any) {
  await dbConnect();
  return await TimeSlotModel.findOneAndUpdate({ id }, data, { new: true }).lean();
}

// Function to get all reservations
export async function getReservations() {
  await dbConnect();
  return await ReservationModel.find({}).lean();
}

// Function to create a reservation
export async function createReservation(data: any) {
  await dbConnect();
  
  // Create a new reservation
  const reservation = new ReservationModel({
    ...data,
    id: `res_${Date.now()}`,
  });
  
  // Save the reservation
  await reservation.save();
  
  // Update the time slot
  const timeSlot = await TimeSlotModel.findOne({ id: data.timeSlotId });
  
  if (timeSlot) {
    timeSlot.registered += data.guestCount;
    timeSlot.available = timeSlot.capacity - timeSlot.registered;
    await timeSlot.save();
  }
  
  return reservation;
}

// Function to delete a reservation
export async function deleteReservation(id: string) {
  await dbConnect();
  
  // Find the reservation
  const reservation = await ReservationModel.findOne({ id });
  
  if (!reservation) {
    throw new Error('Reservation not found');
  }
  
  // Update the time slot
  const timeSlot = await TimeSlotModel.findOne({ id: reservation.timeSlotId });
  
  if (timeSlot) {
    timeSlot.registered -= reservation.guestCount;
    timeSlot.available = timeSlot.capacity - timeSlot.registered;
    await timeSlot.save();
  }
  
  // Delete the reservation
  await ReservationModel.deleteOne({ id });
  
  return { success: true };
}
