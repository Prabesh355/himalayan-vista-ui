<<<<<<< HEAD
const { createModel } = require("../lib/postgresModel");
const { AppError } = require("../utils/errorHandler");

const validBookingStatuses = ["pending", "confirmed", "cancelled", "completed"];
const validPaymentStatuses = ["pending", "partial", "paid", "refunded"];
const validPaymentMethods = ["credit_card", "debit_card", "bank_transfer", "wallet", "cash"];

const Booking = createModel("Booking", {
  defaults: {
    bookingStatus: "pending",
    paymentStatus: "pending",
=======
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const validBookingStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
const validPaymentStatuses = ['pending', 'partial', 'paid', 'refunded'];
const validPaymentMethods = ['credit_card', 'debit_card', 'bank_transfer', 'wallet', 'cash'];

const Booking = createModel('Booking', {
  defaults: {
    bookingStatus: 'pending',
    paymentStatus: 'pending',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    isActive: true,
    discount: 0,
    taxes: 0,
    insurance: () => ({ included: false, insurancePrice: 0 }),
  },
  validate: async (doc) => {
<<<<<<< HEAD
    if (!doc.user) throw new AppError("Please provide a user", 400);
    if (!doc.package) throw new AppError("Please provide a package", 400);
    if (!doc.travelDate) throw new AppError("Please provide travel date", 400);
    if (!doc.endDate) throw new AppError("Please provide end date", 400);
    if (!doc.numberOfTravelers || Number(doc.numberOfTravelers) < 1) {
      throw new AppError("At least 1 traveler is required", 400);
    }
    if (Number(doc.numberOfTravelers) > 100) {
      throw new AppError("Maximum 100 travelers allowed", 400);
=======
    if (!doc.user) throw new AppError('Please provide a user', 400);
    if (!doc.package) throw new AppError('Please provide a package', 400);
    if (!doc.travelDate) throw new AppError('Please provide travel date', 400);
    if (!doc.endDate) throw new AppError('Please provide end date', 400);
    if (!doc.numberOfTravelers || Number(doc.numberOfTravelers) < 1) {
      throw new AppError('At least 1 traveler is required', 400);
    }
    if (Number(doc.numberOfTravelers) > 100) {
      throw new AppError('Maximum 100 travelers allowed', 400);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }
    if (doc.bookingStatus && !validBookingStatuses.includes(doc.bookingStatus)) {
      throw new AppError(`${doc.bookingStatus} is not a valid booking status`, 400);
    }
    if (doc.paymentStatus && !validPaymentStatuses.includes(doc.paymentStatus)) {
      throw new AppError(`${doc.paymentStatus} is not a valid payment status`, 400);
    }
    if (doc.paymentMethod && !validPaymentMethods.includes(doc.paymentMethod)) {
      throw new AppError(`Invalid payment method: ${doc.paymentMethod}`, 400);
    }
  },
  beforeSave: async (doc, context) => {
    if (context.isNew && !doc.bookingNumber) {
      const count = await Booking.countDocuments();
<<<<<<< HEAD
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      doc.bookingNumber = `BK${date}${String(count + 1).padStart(6, "0")}`;
=======
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
      doc.bookingNumber = `BK${date}${String(count + 1).padStart(6, '0')}`;
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }

    if (doc.pricePerPerson != null && doc.numberOfTravelers != null) {
      doc.totalPrice = Number(doc.pricePerPerson) * Number(doc.numberOfTravelers);
    }
  },
  methods: {
    canBeCancelled() {
<<<<<<< HEAD
      return this.bookingStatus !== "completed" && this.bookingStatus !== "cancelled";
=======
      return this.bookingStatus !== 'completed' && this.bookingStatus !== 'cancelled';
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    },
    daysUntilTravel() {
      const today = new Date();
      const travelDate = new Date(this.travelDate);
      const diffTime = travelDate - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
  },
  relations: {
<<<<<<< HEAD
    user: "User",
    package: "Package",
=======
    user: 'User',
    package: 'Package',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  },
});

Booking.getBookingsByDateRange = async function getBookingsByDateRange(startDate, endDate) {
  return Booking.find({
    travelDate: {
      $gte: startDate,
      $lte: endDate,
    },
  });
};

module.exports = Booking;
