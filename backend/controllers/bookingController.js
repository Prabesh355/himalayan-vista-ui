const Booking = require('../models/Booking');
const Package = require('../models/Package');
const User = require('../models/UserPg');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private
 */
exports.createBooking = async (req, res, next) => {
  try {
    const { packageId, travelDate, endDate, numberOfTravelers, travelers, paymentMethod, specialRequests } = req.body;

    // Validate package exists
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return next(new AppError('Package not found', 404));
    }

    // Validate group size
    if (numberOfTravelers < pkg.groupSize.min || numberOfTravelers > pkg.groupSize.max) {
      return next(
        new AppError(
          `Group size must be between ${pkg.groupSize.min} and ${pkg.groupSize.max} travelers`,
          400
        )
      );
    }

    // Validate travelers array length matches numberOfTravelers
    if (travelers.length !== numberOfTravelers) {
      return next(
        new AppError(
          `Number of travelers (${numberOfTravelers}) must match travelers array length (${travelers.length})`,
          400
        )
      );
    }

    // Calculate pricing
    const pricePerPerson = pkg.discountPrice || pkg.price;
    const totalPrice = pricePerPerson * numberOfTravelers;
    const taxes = Math.round(totalPrice * 0.1); // 10% tax

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      package: packageId,
      travelDate,
      endDate,
      numberOfTravelers,
      travelers,
      pricePerPerson,
      totalPrice,
      taxes,
      paymentMethod,
      specialRequests,
      bookingStatus: 'pending',
      paymentStatus: 'pending',
    });

    // Populate references
    await booking.populate([
      {
        path: 'user',
        select: 'firstName lastName email phone',
      },
      {
        path: 'package',
        select: 'title destination price duration difficulty',
      },
    ]);    // Send email notifications
    try {
      const firstTraveler = travelers[0];
      const bookingEmailData = {
        bookingNumber: booking.bookingNumber,
        packageName: booking.package?.title || pkg.title,
        travelDate: booking.travelDate,
        numberOfTravelers: booking.numberOfTravelers,
        totalPrice: booking.totalPrice,
      };

      // Send notification to admin
      await emailService.sendBookingNotification(bookingEmailData, firstTraveler);

      // Send confirmation to customer
      if (firstTraveler.email) {
        await emailService.sendBookingConfirmation(firstTraveler.email, bookingEmailData);
      }
    } catch (emailError) {
      logger.warn(`Email notification failed for booking ${booking.bookingNumber}: ${emailError.message}`);
      // Don't fail the booking if email fails
    }



    logger.info(`Booking created: ${booking.bookingNumber} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    logger.error(`Booking creation error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get single booking
 * @route   GET /api/bookings/:id
 * @access  Private
 */
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    // Check ownership (user can see own booking, admin can see all)
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to view this booking', 403));
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    logger.error(`Get booking error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get user's bookings with pagination and filtering
 * @route   GET /api/bookings
 * @access  Private
 */
exports.getUserBookings = async (req, res, next) => {
  try {
    const { status, paymentStatus, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Build filter
    const filter = { user: req.user.id };
    if (status) filter.bookingStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    // Parse pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const bookings = await Booking.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate([
        {
          path: 'user',
          select: 'firstName lastName email',
        },
        {
          path: 'package',
          select: 'title destination price duration',
        },
      ]);

    // Get total count
    const total = await Booking.countDocuments(filter);
    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      pages,
      currentPage: pageNum,
      data: bookings,
    });
  } catch (error) {
    logger.error(`Get user bookings error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get all bookings (Admin only)
 * @route   GET /api/bookings/admin/all
 * @access  Private/Admin
 */
exports.getAllBookings = async (req, res, next) => {
  try {
    const { status, paymentStatus, userId, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.bookingStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (userId) filter.user = userId;

    // Parse pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const bookings = await Booking.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate([
        {
          path: 'user',
          select: 'firstName lastName email phone',
        },
        {
          path: 'package',
          select: 'title destination price duration',
        },
      ]);

    // Get total count
    const total = await Booking.countDocuments(filter);
    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      pages,
      currentPage: pageNum,
      data: bookings,
    });
  } catch (error) {
    logger.error(`Get all bookings error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update booking (change travelers, requests, etc.)
 * @route   PUT /api/bookings/:id
 * @access  Private
 */
exports.updateBooking = async (req, res, next) => {
  try {
    const { travelers, numberOfTravelers, specialRequests, paymentMethod } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    // Check ownership
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this booking', 403));
    }

    // Cannot update if confirmed or completed
    if (booking.bookingStatus === 'completed' || booking.bookingStatus === 'cancelled') {
      return next(new AppError(`Cannot update a ${booking.bookingStatus} booking`, 400));
    }

    // Update allowed fields
    if (travelers) booking.travelers = travelers;
    if (numberOfTravelers) {
      const pkg = await Package.findById(booking.package);
      if (numberOfTravelers < pkg.groupSize.min || numberOfTravelers > pkg.groupSize.max) {
        return next(
          new AppError(
            `Group size must be between ${pkg.groupSize.min} and ${pkg.groupSize.max}`,
            400
          )
        );
      }
      booking.numberOfTravelers = numberOfTravelers;
      booking.totalPrice = booking.pricePerPerson * numberOfTravelers;
    }
    if (specialRequests) booking.specialRequests = specialRequests;
    if (paymentMethod) booking.paymentMethod = paymentMethod;

    booking = await booking.save();

    await booking.populate([
      {
        path: 'user',
        select: 'firstName lastName email',
      },
      {
        path: 'package',
        select: 'title destination price',
      },
    ]);

    logger.info(`Booking updated: ${booking.bookingNumber}`);

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    logger.error(`Update booking error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Cancel a booking
 * @route   PUT /api/bookings/:id/cancel
 * @access  Private
 */
exports.cancelBooking = async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    // Check ownership
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to cancel this booking', 403));
    }

    // Cannot cancel completed or already cancelled bookings
    if (!booking.canBeCancelled()) {
      return next(new AppError(`Cannot cancel a ${booking.bookingStatus} booking`, 400));
    }

    // Check cancellation policy (days before travel)
    const daysUntilTravel = booking.daysUntilTravel();
    const pkg = await Package.findById(booking.package);

    // Simple policy: Can cancel up to 14 days before travel
    if (daysUntilTravel < 14) {
      return next(
        new AppError(
          `Cancellation must be done at least 14 days before travel. You have ${daysUntilTravel} days.`,
          400
        )
      );
    }

    // Calculate refund (example: 100% refund if > 30 days, 50% if 14-30 days)
    let refundAmount = booking.totalPrice;
    if (daysUntilTravel < 30) {
      refundAmount = booking.totalPrice * 0.5;
    }

    booking.bookingStatus = 'cancelled';
    booking.cancellationDate = new Date();
    booking.cancellationReason = cancellationReason || 'User requested';
    booking.refundAmount = refundAmount;
    booking.refundStatus = 'pending';

    booking = await booking.save();

    await booking.populate([
      {
        path: 'user',
        select: 'firstName lastName email',
      },
      {
        path: 'package',
        select: 'title destination',
      },
    ]);

    logger.info(
      `Booking cancelled: ${booking.bookingNumber}, Refund amount: ${refundAmount}`
    );

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    logger.error(`Cancel booking error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update booking status (Admin only)
 * @route   PUT /api/bookings/:id/status
 * @access  Private/Admin
 */
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingStatus, paymentStatus, notes } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    // Update statuses
    if (bookingStatus) {
      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(bookingStatus)) {
        return next(new AppError(`Invalid booking status: ${bookingStatus}`, 400));
      }
      booking.bookingStatus = bookingStatus;
    }

    if (paymentStatus) {
      const validStatuses = ['pending', 'partial', 'paid', 'refunded'];
      if (!validStatuses.includes(paymentStatus)) {
        return next(new AppError(`Invalid payment status: ${paymentStatus}`, 400));
      }
      booking.paymentStatus = paymentStatus;
    }

    if (notes) booking.notes = notes;

    booking = await booking.save();

    await booking.populate([
      {
        path: 'user',
        select: 'firstName lastName email',
      },
      {
        path: 'package',
        select: 'title destination',
      },
    ]);

    logger.info(`Booking status updated: ${booking.bookingNumber}`);

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    });
  } catch (error) {
    logger.error(`Update booking status error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get booking history with analytics
 * @route   GET /api/bookings/history/analytics
 * @access  Private/Admin
 */
exports.getBookingHistory = async (req, res, next) => {
  try {
    const { startDate, endDate, userId } = req.query;

    // Build filter
    const filter = {};
    if (userId) filter.user = userId;
    if (startDate && endDate) {
      filter.travelDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Get bookings
    const bookings = await Booking.find(filter)
      .sort('-travelDate')
      .populate([
        {
          path: 'user',
          select: 'firstName lastName email',
        },
        {
          path: 'package',
          select: 'title destination',
        },
      ]);

    // Calculate analytics
    const analytics = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
      completedBookings: bookings.filter((b) => b.bookingStatus === 'completed').length,
      cancelledBookings: bookings.filter((b) => b.bookingStatus === 'cancelled').length,
      confirmedBookings: bookings.filter((b) => b.bookingStatus === 'confirmed').length,
      pendingBookings: bookings.filter((b) => b.bookingStatus === 'pending').length,
      paidBookings: bookings.filter((b) => b.paymentStatus === 'paid').length,
      averageBookingValue:
        bookings.length > 0 ? bookings.reduce((sum, b) => sum + b.totalPrice, 0) / bookings.length : 0,
    };

    res.status(200).json({
      success: true,
      analytics,
      data: bookings,
    });
  } catch (error) {
    logger.error(`Get booking history error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get booking statistics by status
 * @route   GET /api/bookings/stats/overview
 * @access  Private/Admin
 */
exports.getBookingStats = async (req, res, next) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$bookingStatus',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const paymentStats = await Booking.aggregate([
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      bookingStats: stats,
      paymentStats,
    });
  } catch (error) {
    logger.error(`Get booking stats error: ${error.message}`);
    next(error);
  }
};

