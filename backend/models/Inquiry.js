const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide a first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    subject: {
      type: String,
      required: [true, 'Please provide an inquiry subject'],
    },
    inquiryType: {
      type: String,
      enum: ['general', 'booking', 'complaint', 'partnership', 'feedback'],
      required: [true, 'Please provide an inquiry type'],
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      minlength: [10, 'Message must be at least 10 characters'],
    },
    preferredContact: {
      type: String,
      enum: ['email', 'phone', 'whatsapp'],
      default: 'email',
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'closed'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    response: {
      message: String,
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      respondedAt: Date,
    },
    notes: String,
    attachments: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
