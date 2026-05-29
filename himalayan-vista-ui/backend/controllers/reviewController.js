const Review = require(" ../models/Review\);
const { ErrorResponse } = require(\../utils/errorHandler\);

exports.createReview = async (req, res, next) => {
 try {
 req.body.user = req.user._id;
 const review = await Review.create(req.body);
 res.status(201).json({ success: true, data: review });
 } catch (error) {
 next(error);
 }
};

exports.getPackageReviews = async (req, res, next) => {
 try {
 const reviews = await Review.find({ package: req.params.id }).populate(\user\, \name\);
 res.status(200).json({ success: true, data: reviews });
 } catch (error) {
 next(error);
 }
};
