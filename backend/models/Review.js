const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const Review = createModel('Review', {
  defaults: {
    status: 'pending',
    verifiedPurchase: false,
    helpful: 0,
  },
  validate: async (doc) => {
    if (!doc.user && !doc.guestName) throw new AppError('Please provide your name', 400);
    if (!doc.rating) throw new AppError('Please provide a rating', 400);
    if (Number(doc.rating) < 1) throw new AppError('Rating must be at least 1', 400);
    if (Number(doc.rating) > 5) throw new AppError('Rating cannot be more than 5', 400);
    if (!doc.title) doc.title = `Review ${doc.rating}/5`;
    if (!doc.comment) throw new AppError('Please provide a review comment', 400);
    if (String(doc.comment).length < 10) throw new AppError('Comment must be at least 10 characters', 400);
  },
  relations: {
    package: 'Package',
    user: 'User',
    booking: 'Booking',
  },
});

Review._validateUniqueReview = async function validateUniqueReview(doc) {
  if (!doc.user) return;
  const existing = await Review.findOne({ user: doc.user, package: doc.package });
  if (existing && existing.id !== doc.id) {
    throw new AppError('Review already exists for this user and package', 400);
  }
};

const originalBeforeSave = Review._beforeSave.bind(Review);
Review._beforeSave = async (doc, context) => {
  await Review._validateUniqueReview(doc);
  if (originalBeforeSave) {
    await originalBeforeSave(doc, context);
  }
};

module.exports = Review;
