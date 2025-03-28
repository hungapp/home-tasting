import mongoose from 'mongoose';

// Define the TimeSlot schema
const TimeSlotSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  time: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  registered: {
    type: Number,
    default: 0
  },
  available: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Create and export the model if it doesn't exist
export default mongoose.models.TimeSlot || mongoose.model('TimeSlot', TimeSlotSchema);
