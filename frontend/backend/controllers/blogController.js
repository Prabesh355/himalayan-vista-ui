<<<<<<< HEAD
const Blog = require("../models/Blog");
=======
const Blog = require('../models/Blog');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const blogs = await Blog.find().populate("author", "name _id");
=======
    const blogs = await Blog.find().populate('author', 'name _id');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
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
<<<<<<< HEAD
    const blogs = await Blog.find({ category: { $regex: new RegExp(categoryName, "i") } }).populate(
      "author",
      "name _id",
    );
=======
    const blogs = await Blog.find({ category: { $regex: new RegExp(categoryName, 'i') } }).populate('author', 'name _id');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
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
<<<<<<< HEAD
    const blog = await Blog.findOne({ slug: req.params.slug }).populate("author", "name _id");
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
=======
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name _id');
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
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
    // Basic body check
    const { title, summary, content, category, author } = req.body;
    let blogauthor = author || req.user.id; // use logged in user if not provided in request

    const blog = await Blog.create({
      title,
      summary,
      content,
      category,
      author: blogauthor,
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
<<<<<<< HEAD
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

=======
       return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
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
<<<<<<< HEAD
      return res.status(404).json({ success: false, message: "Blog not found" });
=======
       return res.status(404).json({ success: false, message: 'Blog not found' });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }
    await Blog.findByIdAndDelete(req.params.id);
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
<<<<<<< HEAD
    res.status(200).json({ success: true, message: "Blog liked/unliked structure." });
=======
    res.status(200).json({ success: true, message: 'Blog liked/unliked structure.' });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  } catch (err) {
    next(err);
  }
};
