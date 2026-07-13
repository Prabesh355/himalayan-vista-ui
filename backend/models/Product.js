const slugify = require('slugify');
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const Product = createModel('Product', {
  defaults: {
    isActive: true,
    inStock: true,
    rating: 0,
    reviews: 0,
    comingSoon: false,
  },
  validate: async (doc) => {
    if (!doc.name) throw new AppError('Please provide a product name', 400);
    if (doc.price == null) throw new AppError('Please provide a product price', 400);
    if (Number(doc.price) < 0) throw new AppError('Price cannot be negative', 400);
    if (!doc.image) throw new AppError('Please provide a product image', 400);
  },
  beforeSave: async (doc) => {
    if (doc.name && (!doc.slug || doc.isModified('name'))) {
      doc.slug = slugify(String(doc.name), { lower: true, strict: true });
    }
  },
  relations: {
    createdBy: 'User',
  },
});

module.exports = Product;
