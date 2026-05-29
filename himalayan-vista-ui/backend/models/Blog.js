const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const Blog = createModel('Blog', {
  defaults: {
    status: 'draft',
    views: 0,
    likes: 0,
    comments: [],
  },
  validate: async (doc) => {
    if (!doc.title) throw new AppError('Please provide a blog title', 400);
    if (!doc.excerpt && !doc.summary) throw new AppError('Please provide an excerpt', 400);
    if (!doc.content) throw new AppError('Please provide blog content', 400);
    if (!doc.author) throw new AppError('Please provide an author', 400);
    if (!doc.category) throw new AppError('Please provide a category', 400);
  },
  beforeSave: async (doc) => {
    if (!doc.excerpt && doc.summary) {
      doc.excerpt = doc.summary;
    }
    if (!doc.featuredImage) {
      doc.featuredImage = '';
    }
    if (!doc.slug && doc.title) {
      doc.slug = String(doc.title)
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }
  },
  relations: {
    author: 'User',
    relatedPosts: { model: 'Blog', many: true },
  },
});

module.exports = Blog;
