<<<<<<< HEAD
const Inquiry = require("../models/Inquiry");
=======
const Inquiry = require('../models/Inquiry');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

exports.createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, data: inquiry });
  } catch (err) {
    next(err);
  }
};

exports.getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (err) {
    next(err);
  }
};

exports.getInquiryStats = async (req, res, next) => {
  try {
    const total = await Inquiry.countDocuments();
    const byStatus = await Inquiry.aggregate([
<<<<<<< HEAD
      { $group: { _id: "$status", count: { $sum: 1 } } },
=======
      { $group: { _id: '$status', count: { $sum: 1 } } },
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      { $sort: { _id: 1 } },
    ]);

    const byPriority = await Inquiry.aggregate([
<<<<<<< HEAD
      { $group: { _id: "$priority", count: { $sum: 1 } } },
=======
      { $group: { _id: '$priority', count: { $sum: 1 } } },
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus,
        byPriority,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
<<<<<<< HEAD
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });
=======
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    res.status(200).json({ success: true, data: inquiry });
  } catch (err) {
    next(err);
  }
};

exports.updateInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: inquiry });
  } catch (err) {
    next(err);
  }
};

exports.respondToInquiry = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { response: req.body.response, status: "replied" },
      { new: true },
    );
=======
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { response: req.body.response, status: 'replied' }, { new: true });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    res.status(200).json({ success: true, data: inquiry });
  } catch (err) {
    next(err);
  }
};

exports.deleteInquiry = async (req, res, next) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
