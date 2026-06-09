const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

const Team = createModel('Team', {
  defaults: {
    isActive: true,
    sortOrder: 0,
    avatar: '',
  },
  validate: async (doc) => {
    if (!doc.name) throw new AppError('Please provide a team member name', 400);
    if (!doc.role) throw new AppError('Please provide a role', 400);
    if (doc.bio && String(doc.bio).length < 10) {
      throw new AppError('Bio must be at least 10 characters', 400);
    }
  },
});

module.exports = Team;