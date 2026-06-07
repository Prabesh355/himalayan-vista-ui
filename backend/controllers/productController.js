const Product = require('../models/Product');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

function buildFilter(query = {}, includeInactive = false) {
  const filter = {};

  if (!includeInactive) {
    filter.isActive = true;
  } else if (query.isActive === 'true') {
    filter.isActive = true;
  } else if (query.isActive === 'false') {
    filter.isActive = false;
  }

  if (query.inStock === 'true') filter.inStock = true;
  if (query.inStock === 'false') filter.inStock = false;

  if (query.category) {
    filter.category = { $regex: query.category, $options: 'i' };
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { category: { $regex: query.search, $options: 'i' } },
    ];
  }

  return filter;
}

exports.getProducts = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || '-createdAt';
    const filter = buildFilter(req.query, false);

    const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit) || 1,
      currentPage: page,
      data: products,
    });
  } catch (error) {
    logger.error(`Get products error: ${error.message}`);
    next(error);
  }
};

exports.getProductsAdmin = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || '-createdAt';
    const filter = buildFilter(req.query, true);

    const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit) || 1,
      currentPage: page,
      data: products,
    });
  } catch (error) {
    logger.error(`Get admin products error: ${error.message}`);
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    logger.error(`Create product error: ${error.message}`);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    if (req.user.role !== 'admin' && (!product.createdBy || product.createdBy.toString() !== req.user.id)) {
      return next(new AppError('Not authorized to update this product', 403));
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ success: true, data: product });
  } catch (error) {
    logger.error(`Update product error: ${error.message}`);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    if (req.user.role !== 'admin' && (!product.createdBy || product.createdBy.toString() !== req.user.id)) {
      return next(new AppError('Not authorized to delete this product', 403));
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    logger.error(`Delete product error: ${error.message}`);
    next(error);
  }
};
