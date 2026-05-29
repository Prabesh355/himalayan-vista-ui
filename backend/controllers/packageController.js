const Package = require('../models/Package');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// @desc Get all packages with search, filter and pagination
// @route GET /api/packages
// @access Public
exports.getAllPackages = async (req, res, next) => {
  try {
    const { search, destination, minPrice, maxPrice, difficulty, category, featured, sort, page = 1, limit = 10 } = req.query;

    // Build filter query
    const filter = { isActive: true };

    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Filter by destination
    if (destination) {
      filter.destination = { $regex: destination, $options: 'i' };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Filter by difficulty
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter featured packages
    if (featured === 'true') {
      filter.featured = true;
    }

    // Pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    let query = Package.find(filter).skip(skip).limit(limitNum);

    // Sorting
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const packages = await query.exec();
    const total = await Package.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: packages,
    });

    logger.info(`Retrieved ${packages.length} packages`);
  } catch (error) {
    logger.error(`Get packages error: ${error.message}`);
    next(error);
  }
};

// @desc Get single package by ID
// @route GET /api/packages/:id
// @access Public
exports.getPackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id).populate('createdBy', 'firstName lastName email');

    if (!pkg) {
      return next(new AppError('Package not found', 404));
    }

    res.status(200).json({
      success: true,
      data: pkg,
    });
  } catch (error) {
    logger.error(`Get package error: ${error.message}`);
    next(error);
  }
};

// @desc Get featured packages
// @route GET /api/packages/featured
// @access Public
exports.getFeaturedPackages = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 6;

    const packages = await Package.find({ isActive: true, featured: true, rating: { $gte: 4 } })
      .limit(limit)
      .sort('-rating');

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });

    logger.info(`Retrieved ${packages.length} featured packages`);
  } catch (error) {
    logger.error(`Get featured packages error: ${error.message}`);
    next(error);
  }
};

// @desc Get packages by destination
// @route GET /api/packages/destination/:destination
// @access Public
exports.getPackagesByDestination = async (req, res, next) => {
  try {
    const { destination } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = {
      isActive: true,
      destination: { $regex: destination, $options: 'i' },
    };

    const packages = await Package.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort('-createdAt');

    const total = await Package.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: packages,
    });
  } catch (error) {
    logger.error(`Get packages by destination error: ${error.message}`);
    next(error);
  }
};

// @desc Create package
// @route POST /api/packages
// @access Private (Admin/Vendor)
exports.createPackage = async (req, res, next) => {
  try {
    // Attach user ID
    req.body.createdBy = req.user.id;

    // Validate that group size is valid
    if (req.body.groupSize.min > req.body.groupSize.max) {
      return next(new AppError('Minimum group size cannot be greater than maximum', 400));
    }

    const pkg = await Package.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: pkg,
    });

    logger.info(`Package created: ${pkg.title} by ${req.user.id}`);
  } catch (error) {
    logger.error(`Create package error: ${error.message}`);
    next(error);
  }
};

// @desc Update package
// @route PUT /api/packages/:id
// @access Private (Creator/Admin)
exports.updatePackage = async (req, res, next) => {
  try {
    let pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return next(new AppError('Package not found', 404));
    }

    // Check ownership (creator or admin)
    if (pkg.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this package', 403));
    }

    // Validate group size if provided
    if (req.body.groupSize && req.body.groupSize.min > req.body.groupSize.max) {
      return next(new AppError('Minimum group size cannot be greater than maximum', 400));
    }

    // Don't allow changing createdBy
    delete req.body.createdBy;

    pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Package updated successfully',
      data: pkg,
    });

    logger.info(`Package updated: ${pkg.title}`);
  } catch (error) {
    logger.error(`Update package error: ${error.message}`);
    next(error);
  }
};

// @desc Delete package
// @route DELETE /api/packages/:id
// @access Private (Creator/Admin)
exports.deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return next(new AppError('Package not found', 404));
    }

    // Check ownership (creator or admin)
    if (pkg.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this package', 403));
    }

    await Package.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Package deleted successfully',
      data: {},
    });

    logger.info(`Package deleted: ${pkg.title}`);
  } catch (error) {
    logger.error(`Delete package error: ${error.message}`);
    next(error);
  }
};

// @desc Search packages
// @route GET /api/packages/search
// @access Public
exports.searchPackages = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return next(new AppError('Please provide a search query', 400));
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const packages = await Package.find(
      { $text: { $search: q }, isActive: true },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limitNum);

    const total = await Package.countDocuments({
      $text: { $search: q },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: packages,
    });

    logger.info(`Search performed: ${q}`);
  } catch (error) {
    logger.error(`Search packages error: ${error.message}`);
    next(error);
  }
};
