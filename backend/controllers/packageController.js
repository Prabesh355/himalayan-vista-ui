const Package = require("../models/Package");
const { AppError } = require("../utils/errorHandler");
const logger = require("../utils/logger");
const slugify = require("slugify");
const {
  deleteCloudinaryAsset,
  isCloudinaryUrl,
} = require("../services/cloudinaryService");

function isOwnedByUser(pkg, user) {
  if (!pkg || !user) return false;
  if (user.role === "admin") return true;
  if (!pkg.createdBy) return true;
  return String(pkg.createdBy) === String(user.id);
}

function getRequestOrigin(req) {
  const forwardedProto = req.get("x-forwarded-proto");
  const protocol = forwardedProto ? forwardedProto.split(",")[0] : req.protocol;
  return `${protocol}://${req.get("host")}`;
}

function normalizeUploadUrl(value, req) {
  if (!value || typeof value !== "string") return value;

  const origin = getRequestOrigin(req);
  if (value.startsWith("/uploads/")) return `${origin}${value}`;
  if (value.startsWith("uploads/")) return `${origin}/${value}`;

  try {
    const parsed = new URL(value);
    const isLocalHost = ["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(
      parsed.hostname,
    );
    if (isLocalHost && parsed.pathname.startsWith("/uploads/")) {
      return `${origin}${parsed.pathname}${parsed.search}`;
    }
  } catch (error) {
    return value;
  }

  return value;
}

function serializePackage(pkg, req) {
  const data = typeof pkg.toObject === "function" ? pkg.toObject() : { ...pkg };
  const images = Array.isArray(data.images)
    ? data.images.map((image) => normalizeUploadUrl(image, req))
    : data.images;

  return {
    ...data,
    image: normalizeUploadUrl(data.image, req),
    images,
    routeMapImage: normalizeUploadUrl(data.routeMapImage, req),
  };
}

function serializePackages(packages, req) {
  return packages.map((pkg) => serializePackage(pkg, req));
}

function normalizeImageList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item.trim() : String(item || "").trim())).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => (typeof item === "string" ? item.trim() : String(item || "").trim())).filter(Boolean);
        }
      } catch (error) {
        // fall through to treat it as a single URL string
      }
    }

    return [trimmed];
  }

  if (value == null) return [];

  return [String(value).trim()].filter(Boolean);
}

function normalizeSingleImage(value) {
  if (Array.isArray(value)) {
    return normalizeSingleImage(value[0]);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || "";
  }

  return value || "";
}

function getPackageImageUrls(pkg) {
  const urls = [
    normalizeSingleImage(pkg?.image),
    ...normalizeImageList(pkg?.images),
    normalizeSingleImage(pkg?.routeMapImage),
  ];
  return [...new Set(urls.filter(Boolean))];
}

async function cleanupPackageImages(urls, context = "package image") {
  const uniqueUrls = [...new Set((urls || []).filter(Boolean))];
  if (!uniqueUrls.length) return;

  await Promise.allSettled(
    uniqueUrls.map(async (url) => {
      if (!isCloudinaryUrl(url)) return;

      try {
        await deleteCloudinaryAsset(url);
      } catch (error) {
        logger.warn(`Failed to delete ${context} from Cloudinary: ${error.message}`);
      }
    }),
  );
}

// @desc Get all packages with search, filter and pagination
// @route GET /api/packages
// @access Public
exports.getAllPackages = async (req, res, next) => {
  try {
    const {
      search,
      destination,
      minPrice,
      maxPrice,
      difficulty,
      category,
      featured,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter query
    const filter = { isActive: true };

    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Filter by destination
    if (destination) {
      filter.destination = { $regex: destination, $options: "i" };
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
    if (featured === "true") {
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
      const sortBy = sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const packages = await query.exec();
    const total = await Package.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: serializePackages(packages, req),
    });

    logger.info(`Retrieved ${packages.length} packages`);
  } catch (error) {
    logger.error(`Get packages error: ${error.message}`);
    next(error);
  }
};

// @desc Get all packages for admin dashboard (includes inactive/drafts)
// @route GET /api/packages/admin/all
// @access Private/Admin or Vendor
exports.getAllPackagesAdmin = async (req, res, next) => {
  try {
    const {
      search,
      destination,
      minPrice,
      maxPrice,
      difficulty,
      category,
      featured,
      isActive,
      sort,
      page = 1,
      limit = 100,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (destination) {
      filter.destination = { $regex: destination, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (isActive === "true") {
      filter.isActive = true;
    } else if (isActive === "false") {
      filter.isActive = false;
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    let query = Package.find(filter).skip(skip).limit(limitNum);

    if (sort) {
      query = query.sort(sort.split(",").join(" "));
    } else {
      query = query.sort("-createdAt");
    }

    const packages = await query.exec();
    const total = await Package.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: serializePackages(packages, req),
    });
  } catch (error) {
    logger.error(`Get admin packages error: ${error.message}`);
    next(error);
  }
};

// @desc Get single package by ID
// @route GET /api/packages/:id
// @access Public
exports.getPackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id).populate(
      "createdBy",
      "firstName lastName email",
    );

    if (!pkg) {
      return next(new AppError("Package not found", 404));
    }

    res.status(200).json({
      success: true,
      data: serializePackage(pkg, req),
    });
  } catch (error) {
    logger.error(`Get package error: ${error.message}`);
    next(error);
  }
};

// @desc Get single package by slug
// @route GET /api/packages/slug/:slug
// @access Public
exports.getPackageBySlug = async (req, res, next) => {
  try {
    const packages = await Package.find({
      slug: req.params.slug,
      isActive: true,
    }).populate("createdBy", "firstName lastName email");

    if (!packages || packages.length === 0) {
      return next(new AppError("Package not found", 404));
    }

    res.status(200).json({
      success: true,
      data: serializePackage(packages[0], req),
    });
  } catch (error) {
    logger.error(`Get package by slug error: ${error.message}`);
    next(error);
  }
};

// @desc Get featured packages
// @route GET /api/packages/featured
// @access Public
exports.getFeaturedPackages = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;

    let packages = await Package.find({ isActive: true, featured: true })
      .limit(limit)
      .sort("-createdAt");

    if (!packages.length) {
      packages = await Package.find({ isActive: true })
        .limit(limit)
        .sort("-createdAt");
    }

    res.status(200).json({
      success: true,
      count: packages.length,
      data: serializePackages(packages, req),
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
      destination: { $regex: destination, $options: "i" },
    };

    const packages = await Package.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort("-createdAt");

    const total = await Package.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: serializePackages(packages, req),
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
    req.body.image = normalizeSingleImage(req.body.image);
    req.body.images = normalizeImageList(req.body.images);

    const slug = slugify(String(req.body.title || ""), {
      lower: true,
      strict: true,
    });
    if (slug) {
      const existing = await Package.findOne({ slug });
      if (existing) {
        return next(
          new AppError(
            "A package with this title already exists. Edit the existing package instead of creating a duplicate.",
            409,
          ),
        );
      }
    }

    // Validate that group size is valid
    if (req.body.groupSize.min > req.body.groupSize.max) {
      return next(
        new AppError("Minimum group size cannot be greater than maximum", 400),
      );
    }

    const pkg = await Package.create(req.body);

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: serializePackage(pkg, req),
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
      return next(new AppError("Package not found", 404));
    }

    // Check ownership (creator or admin). Legacy packages without createdBy can be adopted on edit.
    if (!isOwnedByUser(pkg, req.user)) {
      return next(new AppError("Not authorized to update this package", 403));
    }

    if (!pkg.createdBy) {
      req.body.createdBy = req.user.id;
    }

    const previousImageUrls = getPackageImageUrls(pkg);
    const nextImageProvided = Object.prototype.hasOwnProperty.call(req.body, "image");
    const nextImagesProvided = Object.prototype.hasOwnProperty.call(req.body, "images");
    const nextImage = nextImageProvided ? normalizeSingleImage(req.body.image) : normalizeSingleImage(pkg.image);
    const nextImages = nextImagesProvided ? normalizeImageList(req.body.images) : normalizeImageList(pkg.images);

    const nextSlug = req.body.title
      ? slugify(String(req.body.title), { lower: true, strict: true })
      : null;
    if (nextSlug) {
      const duplicate = await Package.findOne({ slug: nextSlug });
      if (
        duplicate &&
        String(duplicate.id || duplicate._id) !== String(pkg.id || pkg._id)
      ) {
        return next(
          new AppError(
            "A package with this title already exists. Please edit the existing package instead of creating a duplicate.",
            409,
          ),
        );
      }
    }

    // Validate group size if provided
    if (req.body.groupSize && req.body.groupSize.min > req.body.groupSize.max) {
      return next(
        new AppError("Minimum group size cannot be greater than maximum", 400),
      );
    }

    // Don't allow changing createdBy
    delete req.body.createdBy;
    if (nextImageProvided) {
      req.body.image = nextImage;
    }
    if (nextImagesProvided) {
      req.body.images = nextImages;
    }

    pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    const retainedUrls = new Set(getPackageImageUrls(pkg));
    const removedUrls = previousImageUrls.filter((url) => !retainedUrls.has(url));
    await cleanupPackageImages(removedUrls, `package ${pkg.title}`);

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: serializePackage(pkg, req),
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
      return next(new AppError("Package not found", 404));
    }

    // Check ownership (creator or admin). Legacy packages without createdBy can be deleted by any authorized package editor.
    if (!isOwnedByUser(pkg, req.user)) {
      return next(new AppError("Not authorized to delete this package", 403));
    }

    const imageUrls = getPackageImageUrls(pkg);
    await Package.findByIdAndDelete(req.params.id);
    await cleanupPackageImages(imageUrls, `package ${pkg.title}`);

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
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
      return next(new AppError("Please provide a search query", 400));
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const packages = await Package.find(
      { $text: { $search: q }, isActive: true },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
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
      data: serializePackages(packages, req),
    });

    logger.info(`Search performed: ${q}`);
  } catch (error) {
    logger.error(`Search packages error: ${error.message}`);
    next(error);
  }
};
