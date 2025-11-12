import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  roomType: {
    type: String,
    required: [true, 'Please provide room type'],
    enum: ['Single Bed', 'Double Bed', 'Suite', 'Deluxe', 'Presidential Suite']
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please provide price per night'],
    min: 0
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  maxGuests: {
    type: Number,
    default: 2,
    min: 1
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Room = mongoose.model('Room', roomSchema);

export default Room;

