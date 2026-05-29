const mongoose = require('mongoose');
const slugify = require('slugify');

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a package title'],
      trim: true,
      unique: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      minlength: [20, 'Description must be at least 20 characters'],
    },
    destination: {
      type: String,
      required: [true, 'Please provide a destination'],
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
      index: true,
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function (v) {
          return !v || v < this.price;
        },
        message: 'Discount price must be less than price',
      },
    },
    duration: {
      days: {
        type: Number,
        required: [true, 'Please provide number of days'],
        min: [1, 'Duration must be at least 1 day'],
      },
      nights: {
        type: Number,
        required: [true, 'Please provide number of nights'],
      },
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one image'],
    },
    highlights: [String],
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
        activities: [String],
      },
    ],
    inclusions: [String],
    exclusions: [String],
    groupSize: {
      min: {
        type: Number,
        required: [true, 'Please provide minimum group size'],
      },
      max: {
        type: Number,
        required: [true, 'Please provide maximum group size'],
      },
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'difficult', 'expert'],
      default: 'moderate',
    },
    bestSeason: [String],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: false,
      },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    availability: {
      startDate: Date,
      endDate: Date,
      slots: Number,
      bookedSlots: {
        type: Number,
        default: 0,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: {
        values: ['trekking', 'cultural', 'adventure', 'luxury', 'wildlife'],
        message: 'Invalid category',
      },
      default: 'adventure',
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

// Create indexes for search and filtering
packageSchema.index({ 'location': '2dsphere' });
packageSchema.index({ title: 'text', description: 'text', destination: 'text' });

// Generate slug from title before saving
packageSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next();
  }
  
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  
  next();
});

// Populate createdBy user info
packageSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'createdBy',
    select: 'firstName lastName email',
  });
  next();
});

module.exports = mongoose.model('Package', packageSchema);
