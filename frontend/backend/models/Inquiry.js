<<<<<<< HEAD
const { createModel } = require("../lib/postgresModel");
const { AppError } = require("../utils/errorHandler");

const Inquiry = createModel("Inquiry", {
  defaults: {
    status: "new",
    priority: "medium",
    preferredContact: "email",
  },
  validate: async (doc) => {
    if (!doc.firstName) throw new AppError("Please provide a first name", 400);
    if (!doc.lastName) throw new AppError("Please provide a last name", 400);
    if (!doc.email) throw new AppError("Please provide an email", 400);
    if (!doc.phone) throw new AppError("Please provide a phone number", 400);
    if (!doc.subject) throw new AppError("Please provide an inquiry subject", 400);
    if (!doc.inquiryType) throw new AppError("Please provide an inquiry type", 400);
    if (!doc.message) throw new AppError("Please provide a message", 400);
    if (String(doc.message).length < 10)
      throw new AppError("Message must be at least 10 characters", 400);
=======
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const Inquiry = createModel('Inquiry', {
  defaults: {
    status: 'new',
    priority: 'medium',
    preferredContact: 'email',
  },
  validate: async (doc) => {
    if (!doc.firstName) throw new AppError('Please provide a first name', 400);
    if (!doc.lastName) throw new AppError('Please provide a last name', 400);
    if (!doc.email) throw new AppError('Please provide an email', 400);
    if (!doc.phone) throw new AppError('Please provide a phone number', 400);
    if (!doc.subject) throw new AppError('Please provide an inquiry subject', 400);
    if (!doc.inquiryType) throw new AppError('Please provide an inquiry type', 400);
    if (!doc.message) throw new AppError('Please provide a message', 400);
    if (String(doc.message).length < 10) throw new AppError('Message must be at least 10 characters', 400);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  },
  beforeSave: async (doc) => {
    if (doc.email) {
      doc.email = String(doc.email).toLowerCase();
    }
  },
  relations: {
<<<<<<< HEAD
    package: "Package",
    assignedTo: "User",
    "response.respondedBy": "User",
=======
    package: 'Package',
    assignedTo: 'User',
    'response.respondedBy': 'User',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  },
});

module.exports = Inquiry;
