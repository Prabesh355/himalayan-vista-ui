const Blog = require('../models/Blog');
const logger = require('../utils/logger');
const {
  deleteCloudinaryAsset,
  isCloudinaryUrl,
} = require('../services/cloudinaryService');

async function cleanupCloudinaryImage(url, context) {
  if (!url || !isCloudinaryUrl(url)) return;

  try {
    await deleteCloudinaryAsset(url);
  } catch (error) {
    logger.warn(`Failed to delete ${context} image from Cloudinary: ${error.message}`);
  }
}

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).populate('author', 'name _id');
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    next(err);
  }
};

// @desc    Get blogs by category
// @route   GET /api/blogs/category/:category
// @access  Public
exports.getBlogsByCategory = async (req, res, next) => {
  try {
    const categoryName = req.params.category;
    // We expect the array of strings or simple string matching
    const blogs = await Blog.find({ category: { $regex: new RegExp(categoryName, 'i') } }).populate('author', 'name _id');
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name _id');
    if (!blog && /^[a-f\d]{24}$/i.test(req.params.slug)) {
      blog = await Blog.findById(req.params.slug).populate('author', 'name _id');
    }
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res, next) => {
  try {
    const { title, summary, excerpt, content, category, author, status, featuredImage, tags } = req.body;
    const blogauthor = author || req.user.id; // use logged in user if not provided in request
    const slug = String(title || '')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    if (slug) {
      const existing = await Blog.findOne({ slug });
      if (existing) {
        return res.status(409).json({ success: false, message: 'A blog with this title already exists' });
      }
    }

    const blog = await Blog.create({
      title,
      summary: summary || excerpt,
      excerpt: excerpt || summary,
      content,
      category,
      author: blogauthor,
      status: status === 'published' ? 'published' : 'draft',
      featuredImage: featuredImage || '',
      tags: Array.isArray(tags) ? tags : [],
      slug,
    });
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
       return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (req.body.title) {
      req.body.slug = String(req.body.title)
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      const duplicate = await Blog.findOne({ slug: req.body.slug });
      if (duplicate && String(duplicate.id || duplicate._id) !== String(blog.id || blog._id)) {
        return res.status(409).json({ success: false, message: 'A blog with this title already exists' });
      }
    }

    const previousFeaturedImage = blog.featuredImage;
    
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (Object.prototype.hasOwnProperty.call(req.body, 'featuredImage') && previousFeaturedImage && previousFeaturedImage !== blog.featuredImage) {
      await cleanupCloudinaryImage(previousFeaturedImage, `blog ${blog.title}`);
    }
    
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
       return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    const previousFeaturedImage = blog.featuredImage;
    await Blog.findByIdAndDelete(req.params.id);
    await cleanupCloudinaryImage(previousFeaturedImage, `blog ${blog.title}`);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Like/Unlike a blog
// @route   POST /api/blogs/:id/like
// @access  Private
exports.likeBlog = async (req, res, next) => {
  try {
    // Very simple stub for liking a blog
    res.status(200).json({ success: true, message: 'Blog liked/unliked structure.' });
  } catch (err) {
    next(err);
  }
};
