<<<<<<< HEAD
const slugify = require("slugify");
const { createModel } = require("../lib/postgresModel");
const { AppError } = require("../utils/errorHandler");

const Package = createModel("Package", {
=======
const slugify = require('slugify');
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const Package = createModel('Package', {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  defaults: {
    isActive: true,
    featured: false,
    rating: 0,
    reviewCount: 0,
  },
  validate: async (doc) => {
<<<<<<< HEAD
    if (!doc.title) throw new AppError("Please provide a package title", 400);
    if (!doc.description) throw new AppError("Please provide a description", 400);
    if (String(doc.description).length < 20)
      throw new AppError("Description must be at least 20 characters", 400);
    if (!doc.destination) throw new AppError("Please provide a destination", 400);
    if (doc.price == null) throw new AppError("Please provide a price", 400);
    if (Number(doc.price) < 0) throw new AppError("Price cannot be negative", 400);
    if (!doc.duration || doc.duration.days == null || doc.duration.nights == null) {
      throw new AppError("Please provide duration days and nights", 400);
    }
    if (!Array.isArray(doc.images) || doc.images.length === 0) {
      throw new AppError("Please provide at least one image", 400);
    }
    if (!doc.groupSize || doc.groupSize.min == null || doc.groupSize.max == null) {
      throw new AppError("Please provide group size min/max", 400);
    }
    if (doc.groupSize.min > doc.groupSize.max) {
      throw new AppError("Minimum group size cannot be greater than maximum", 400);
    }
    if (doc.discountPrice != null && Number(doc.discountPrice) >= Number(doc.price)) {
      throw new AppError("Discount price must be less than price", 400);
    }
  },
  beforeSave: async (doc) => {
    if (doc.title && (!doc.slug || doc.isModified("title"))) {
=======
    if (!doc.title) throw new AppError('Please provide a package title', 400);
    if (!doc.description) throw new AppError('Please provide a description', 400);
    if (String(doc.description).length < 20) throw new AppError('Description must be at least 20 characters', 400);
    if (!doc.destination) throw new AppError('Please provide a destination', 400);
    if (doc.price == null) throw new AppError('Please provide a price', 400);
    if (Number(doc.price) < 0) throw new AppError('Price cannot be negative', 400);
    if (!doc.duration || doc.duration.days == null || doc.duration.nights == null) {
      throw new AppError('Please provide duration days and nights', 400);
    }
    if (!Array.isArray(doc.images) || doc.images.length === 0) {
      throw new AppError('Please provide at least one image', 400);
    }
    if (!doc.groupSize || doc.groupSize.min == null || doc.groupSize.max == null) {
      throw new AppError('Please provide group size min/max', 400);
    }
    if (doc.groupSize.min > doc.groupSize.max) {
      throw new AppError('Minimum group size cannot be greater than maximum', 400);
    }
    if (doc.discountPrice != null && Number(doc.discountPrice) >= Number(doc.price)) {
      throw new AppError('Discount price must be less than price', 400);
    }
  },
  beforeSave: async (doc) => {
    if (doc.title && (!doc.slug || doc.isModified('title'))) {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      doc.slug = slugify(String(doc.title), { lower: true, strict: true });
    }
  },
  relations: {
<<<<<<< HEAD
    createdBy: "User",
=======
    createdBy: 'User',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  },
});

module.exports = Package;
