import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    bookingId: {
      type: String, // Can be linked to a booking
    },
    status: {
      type: String,
      enum: ['New', 'Published', 'Archived'],
      default: 'New'
    }
  },
  {
    timestamps: true,
  }
);

FeedbackSchema.index({ status: 1, createdAt: -1 });

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
