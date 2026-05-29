const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // Booking identifier
    bookingNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    // References
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
      index: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Please provide a package'],
      index: true,
    },

    // Travel information
    travelDate: {
      type: Date,
      required: [true, 'Please provide travel date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide end date'],
    },
    numberOfTravelers: {
      type: Number,
      required: [true, 'Please provide number of travelers'],
      min: [1, 'At least 1 traveler is required'],
      max: [100, 'Maximum 100 travelers allowed'],
    },

    // Traveler information
    travelers: [
      {
        firstName: {
          type: String,
          required: [true, 'Traveler first name is required'],
          trim: true,
        },
        lastName: {
          type: String,
          required: [true, 'Traveler last name is required'],
          trim: true,
        },
        email: {
          type: String,
          lowercase: true,
        },
        phone: String,
        dateOfBirth: Date,
        nationality: String,
        idNumber: String,
        passportNumber: String,
        specialRequests: String,
      },
    ],

    // Pricing information
    pricePerPerson: {
      type: Number,
      required: [true, 'Price per person is required'],
      min: [0, 'Price cannot be negative'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
    },
    discountCode: String,
    taxes: {
      type: Number,
      default: 0,
      min: [0, 'Taxes cannot be negative'],
    },
    insurance: {
      included: {
        type: Boolean,
        default: false,
      },
      insurancePrice: {
        type: Number,
        default: 0,
        min: [0, 'Insurance price cannot be negative'],
      },
      insuranceType: String,
    },

    // Status tracking
    bookingStatus: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'cancelled', 'completed'],
        message: '{VALUE} is not a valid booking status',
      },
      default: 'pending',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'partial', 'paid', 'refunded'],
        message: '{VALUE} is not a valid payment status',
      },
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'bank_transfer', 'wallet', 'cash'],
    },

    // Additional information
    specialRequests: String,
    notes: String,
    cancellationPolicy: String,
    
    // Cancellation tracking
    cancellationDate: Date,
    cancellationReason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'rejected'],
    },

    // Additional tracking
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes for performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ bookingStatus: 1, paymentStatus: 1 });
bookingSchema.index({ travelDate: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.compound;

// Generate unique booking number
bookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const count = await this.constructor.countDocuments();
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
      this.bookingNumber = `BK${date}${String(count + 1).padStart(6, '0')}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Auto-populate user and package on find operations
bookingSchema.pre(/^find/, function (next) {
  if (this.options._recursive) {
    return next();
  }
  this.populate({
    path: 'user',
    select: 'firstName lastName email phone',
  }).populate({
    path: 'package',
    select: 'title destination price duration difficulty',
  });
  next();
});

// Calculate totals
bookingSchema.pre('save', function (next) {
  if (this.isModified('pricePerPerson') || this.isModified('numberOfTravelers')) {
    this.totalPrice = this.pricePerPerson * this.numberOfTravelers;
  }
  next();
});

// Instance method: Check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function () {
  return this.bookingStatus !== 'completed' && this.bookingStatus !== 'cancelled';
};

// Instance method: Get days until travel
bookingSchema.methods.daysUntilTravel = function () {
  const today = new Date();
  const travelDate = new Date(this.travelDate);
  const diffTime = travelDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Static method: Get bookings by date range
bookingSchema.statics.getBookingsByDateRange = function (startDate, endDate) {
  return this.find({
    travelDate: {
      $gte: startDate,
      $lte: endDate,
    },
  });
};

module.exports = mongoose.model('Booking', bookingSchema);
