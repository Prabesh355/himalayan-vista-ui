const Blog = require(" ../models/Blog\);
const { ErrorResponse } = require(\../utils/errorHandler\);

exports.getBlogs = async (req, res, next) => {
 try {
 const blogs = await Blog.find().populate(\author\, \name\);
 res.status(200).json({ success: true, data: blogs });
 } catch (error) {
 next(error);
 }
};

exports.createBlog = async (req, res, next) => {
 try {
 req.body.author = req.user._id;
 const blog = await Blog.create(req.body);
 res.status(201).json({ success: true, data: blog });
 } catch (error) {
 next(error);
 }
};
