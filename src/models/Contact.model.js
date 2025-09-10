import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
        type: String,
        enum: ['New', 'Read'],
        default: 'New'
    }
  },
  {
    timestamps: true,
  }
);

ContactSchema.index({ createdAt: -1 });

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;
