const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

function getJwtExpiresIn() {
  const raw = String(process.env.JWT_EXPIRE || '').trim();

  if (!raw) {
    return '30d';
  }

  if (/^\d+$/.test(raw)) {
    return Number(raw);
  }

  if (/^\d+(ms|s|m|h|d|w|y)$/.test(raw)) {
    return raw;
  }

  return '30d';
}

const User = createModel('User', {
  defaults: {
    role: 'user',
    isActive: true,
    isEmailVerified: false,
    preferences: () => ({ newsletter: false, notifications: true }),
    address: () => ({}),
  },
  validate: async (doc) => {
    if (!doc.firstName) throw new AppError('Please provide a first name', 400);
    if (!doc.lastName) throw new AppError('Please provide a last name', 400);
    if (!doc.email) throw new AppError('Please provide an email', 400);
    if (!emailRegex.test(String(doc.email))) throw new AppError('Please provide a valid email', 400);
    if (!doc.password) throw new AppError('Please provide a password', 400);
    if (String(doc.password).length < 6) throw new AppError('Password must be at least 6 characters', 400);
    if (doc.phone && !/^\d{10,15}$/.test(String(doc.phone))) {
      throw new AppError('Please provide a valid phone number', 400);
    }
  },
  beforeSave: async (doc, context) => {
    if (context.isNew || doc.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(String(doc.password), salt);
    }

    if (doc.email) {
      doc.email = String(doc.email).toLowerCase();
    }
  },
  methods: {
    async matchPassword(enteredPassword) {
      return bcrypt.compare(enteredPassword, this.password);
    },
    getSignedJwtToken() {
      return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: getJwtExpiresIn(),
      });
    },
    getResetPasswordToken() {
      const resetToken = crypto.randomBytes(20).toString('hex');
      this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
      return resetToken;
    },
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  toJSON: (doc) => {
    const obj = doc.toObject();
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpiry;
    delete obj.verificationToken;
    delete obj.verificationTokenExpiry;
    return obj;
  },
});

module.exports = User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const User = createModel('User', {
  defaults: {
    role: 'user',
    isActive: true,
    isEmailVerified: false,
    preferences: () => ({ newsletter: false, notifications: true }),
    address: () => ({}),
  },
  validate: async (doc) => {
    if (!doc.firstName) throw new AppError('Please provide a first name', 400);
    if (!doc.lastName) throw new AppError('Please provide a last name', 400);
    if (!doc.email) throw new AppError('Please provide an email', 400);
    if (!emailRegex.test(String(doc.email))) throw new AppError('Please provide a valid email', 400);
    if (!doc.password) throw new AppError('Please provide a password', 400);
    if (String(doc.password).length < 6) throw new AppError('Password must be at least 6 characters', 400);
    if (doc.phone && !/^\d{10,15}$/.test(String(doc.phone))) {
      throw new AppError('Please provide a valid phone number', 400);
    }
  },
  beforeSave: async (doc, context) => {
    if (context.isNew || doc.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(String(doc.password), salt);
    }

    if (doc.email) {
      doc.email = String(doc.email).toLowerCase();
    }
  },
  methods: {
    async matchPassword(enteredPassword) {
      return bcrypt.compare(enteredPassword, this.password);
    },
    getSignedJwtToken() {
      return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: getJwtExpiresIn(),
      });
    },
    getResetPasswordToken() {
      const resetToken = crypto.randomBytes(20).toString('hex');
      this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
      return resetToken;
    },
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  toJSON: (doc) => {
    const obj = doc.toObject();
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpiry;
    delete obj.verificationToken;
    delete obj.verificationTokenExpiry;
    return obj;
  },
});

module.exports = User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const User = createModel('User', {
  defaults: {
    role: 'user',
    isActive: true,
    isEmailVerified: false,
    preferences: () => ({ newsletter: false, notifications: true }),
  },
  validate: async (doc) => {
    if (!doc.firstName) throw new AppError('Please provide a first name', 400);
    if (!doc.lastName) throw new AppError('Please provide a last name', 400);
    if (!doc.email) throw new AppError('Please provide an email', 400);
    if (!emailRegex.test(String(doc.email))) throw new AppError('Please provide a valid email', 400);
    if (!doc.password) throw new AppError('Please provide a password', 400);
    if (String(doc.password).length < 6) throw new AppError('Password must be at least 6 characters', 400);
    if (doc.phone && !/^\d{10,15}$/.test(String(doc.phone))) {
      throw new AppError('Please provide a valid phone number', 400);
    }
  },
  beforeSave: async (doc, context) => {
    if (context.isNew || doc.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(String(doc.password), salt);
    }

    if (doc.email) {
      doc.email = String(doc.email).toLowerCase();
    }
  },
  methods: {
    async matchPassword(enteredPassword) {
      return bcrypt.compare(enteredPassword, this.password);
    },
    getSignedJwtToken() {
      return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: getJwtExpiresIn(),
      });
    },
    getResetPasswordToken() {
      const resetToken = crypto.randomBytes(20).toString('hex');
      this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
      return resetToken;
    },
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  toJSON: (doc) => {
    const obj = doc.toObject();
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpiry;
    delete obj.verificationToken;
    delete obj.verificationTokenExpiry;
    return obj;
  },
});

module.exports = User;
