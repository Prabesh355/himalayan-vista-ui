const Inquiry = require(" ../models/Inquiry\);

exports.sendInquiry = async (req, res, next) => {
 try {
 const inquiry = await Inquiry.create(req.body);
 res.status(201).json({ success: true, message: \Inquiry sent successfully\, data: inquiry });
 } catch (error) {
 next(error);
 }
};

exports.getInquiries = async (req, res, next) => {
 try {
 const inquiries = await Inquiry.find();
 res.status(200).json({ success: true, data: inquiries });
 } catch (error) {
 next(error);
 }
};
