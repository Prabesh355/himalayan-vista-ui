const { createModel } = require('../lib/postgresModel');
const { AppError } = require('../utils/errorHandler');

module.exports = createModel('ItineraryDay', {
  defaults: { subtitle: '', altitude: '', meals: '', accommodation: '', hours: '', distance: '', coverImage: '', gallery: [], checklist: [], description: '', notes: '', tips: '', routeMap: null, infoCards: [], contentBlocks: [], sortOrder: 0 },
  validate: async (doc) => {
    if (!doc.packageId) throw new AppError('Package is required', 400);
    if (!Number.isInteger(Number(doc.dayNumber)) || Number(doc.dayNumber) < 1) throw new AppError('Day number must be at least 1', 400);
    if (!doc.title || !String(doc.title).trim()) throw new AppError('Day title is required', 400);
    if (!Array.isArray(doc.gallery) || !Array.isArray(doc.checklist) || !Array.isArray(doc.infoCards) || !Array.isArray(doc.contentBlocks)) throw new AppError('Gallery, checklist, cards, and content blocks must be arrays', 400);
  },
});
