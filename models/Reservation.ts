import mongoose from 'mongoose';

// Define the Reservation schema
const ReservationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  timeSlotId: {
    type: String,
    required: true
  },
  guestCount: {
    type: Number,
    required: true
  },
  notes: String,
  dietaryPreference: String,
  waiverAgreed: {
    type: Boolean,
    default: false
  },
  waiverDate: Date,
  paymentConfirmed: {
    type: Boolean,
    default: false
  },
  paymentAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model if it doesn't exist
export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);
