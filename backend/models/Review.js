const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Please provide a package'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a review title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
      minlength: [10, 'Comment must be at least 10 characters'],
    },
    ratingBreakdown: {
      guide: {
        type: Number,
        min: 1,
        max: 5,
      },
      accommodation: {
        type: Number,
        min: 1,
        max: 5,
      },
      food: {
        type: Number,
        min: 1,
        max: 5,
      },
      transport: {
        type: Number,
        min: 1,
        max: 5,
      },
      value: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    verifiedPurchase: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    images: [String],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews from same user for same package
reviewSchema.index({ user: 1, package: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
