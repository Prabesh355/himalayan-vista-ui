<<<<<<< HEAD
const { createModel } = require("../lib/postgresModel");
const { AppError } = require("../utils/errorHandler");

const Blog = createModel("Blog", {
  defaults: {
    status: "draft",
=======
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const Blog = createModel('Blog', {
  defaults: {
    status: 'draft',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    views: 0,
    likes: 0,
    comments: [],
  },
  validate: async (doc) => {
<<<<<<< HEAD
    if (!doc.title) throw new AppError("Please provide a blog title", 400);
    if (!doc.excerpt && !doc.summary) throw new AppError("Please provide an excerpt", 400);
    if (!doc.content) throw new AppError("Please provide blog content", 400);
    if (!doc.author) throw new AppError("Please provide an author", 400);
    if (!doc.category) throw new AppError("Please provide a category", 400);
=======
    if (!doc.title) throw new AppError('Please provide a blog title', 400);
    if (!doc.excerpt && !doc.summary) throw new AppError('Please provide an excerpt', 400);
    if (!doc.content) throw new AppError('Please provide blog content', 400);
    if (!doc.author) throw new AppError('Please provide an author', 400);
    if (!doc.category) throw new AppError('Please provide a category', 400);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  },
  beforeSave: async (doc) => {
    if (!doc.excerpt && doc.summary) {
      doc.excerpt = doc.summary;
    }
    if (!doc.featuredImage) {
<<<<<<< HEAD
      doc.featuredImage = "";
=======
      doc.featuredImage = '';
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }
    if (!doc.slug && doc.title) {
      doc.slug = String(doc.title)
        .toLowerCase()
<<<<<<< HEAD
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }
  },
  relations: {
    author: "User",
    relatedPosts: { model: "Blog", many: true },
=======
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }
  },
  relations: {
    author: 'User',
    relatedPosts: { model: 'Blog', many: true },
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  },
});

module.exports = Blog;
