const Review = require('../models/Review');
const Package = require('../models/Package');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).populate('user', 'name');
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

// @desc    Get package reviews
// @route   GET /api/reviews/package/:packageId
// @access  Public
exports.getPackageReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ package: req.params.packageId, status: 'approved' }).populate('user', 'name');
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

// @desc    Get approved reviews for a package by slug
// @route   GET /api/reviews/package-slug/:slug
// @access  Public
exports.getPackageReviewsBySlug = async (req, res, next) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });

    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    const reviews = await Review.find({ package: pkg.id, status: 'approved' })
      .populate('user', 'firstName lastName email')
      .populate('package', 'title slug destination');

    res.status(200).json({ success: true, package: pkg, data: reviews });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { package, rating, comment } = req.body;
    const review = await Review.create({
      package,
      user: req.user.id,
      rating,
      comment,
      status: 'pending' // need approval
    });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
       return res.status(404).json({ success: false, message: 'Review not found' });
    }
    // Only user can update their review
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
       return res.status(404).json({ success: false, message: 'Review not found' });
    }
    // Only user can delete their review
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Approve review
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
exports.approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!review) {
       return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};
