import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Completed', 'Cancelled'],
      default: 'Upcoming',
    },
    amount: {
      type: Number,
      required: true,
    },
    customerDetails: {
        name: String,
        phone: String,
    }
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ userId: 1, date: -1 });

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;
