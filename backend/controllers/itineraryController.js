const ItineraryDay = require('../models/ItineraryDay');
const Package = require('../models/Package');
const { AppError } = require('../utils/errorHandler');

async function ownedPackage(packageId, user) {
  const pkg = await Package.findById(packageId);
  if (!pkg) throw new AppError('Package not found', 404);
  if (user.role !== 'admin' && String(pkg.createdBy || '') !== String(user.id)) throw new AppError('Not authorized', 403);
  return pkg;
}
function migrateMarkdownItinerary(packageId, markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  const days = [];
  let current = null;
  const dayPattern = /^(?:#{1,6}\s*)?(?:\*\*)?Day\s*(\d+)\s*(?:[:—–-]\s*|\s+)(.+?)(?:\*\*)?$/i;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    const match = line.match(dayPattern);
    if (match) {
      if (current) days.push(current);
      current = { packageId, dayNumber: Number(match[1]), title: match[2].replace(/\*+/g, '').trim(), description: '', checklist: [], infoCards: [], contentBlocks: [], gallery: [], sortOrder: days.length };
    } else if (current && line && !/^---+$/.test(line)) {
      current.description += `${current.description ? '\n' : ''}${line.replace(/^[-*]\s+/, '')}`;
    }
  }
  if (current) days.push(current);
  return days;
}
exports.list = async (req, res, next) => { try {
  let days = await ItineraryDay.find({ packageId: req.params.packageId }).sort('sortOrder dayNumber');
  if (!days.length) {
    const pkg = await Package.findById(req.params.packageId);
    const migrated = migrateMarkdownItinerary(req.params.packageId, pkg?.itinerary);
    if (migrated.length) {
      days = await Promise.all(migrated.map((day) => ItineraryDay.create(day)));
    }
  }
  res.json({ success: true, data: days });
} catch (err) { next(err); } };
exports.create = async (req, res, next) => { try { await ownedPackage(req.params.packageId, req.user); const existing = await ItineraryDay.find({ packageId: req.params.packageId }); const day = await ItineraryDay.create({ ...req.body, packageId: req.params.packageId, dayNumber: Number(req.body.dayNumber || existing.length + 1), sortOrder: Number(req.body.sortOrder ?? existing.length) }); res.status(201).json({ success: true, data: day }); } catch (err) { next(err); } };
exports.update = async (req, res, next) => { try { const day = await ItineraryDay.findById(req.params.id); if (!day) throw new AppError('Itinerary day not found', 404); await ownedPackage(day.packageId, req.user); Object.assign(day, req.body, { packageId: day.packageId }); await day.save(); res.json({ success: true, data: day }); } catch (err) { next(err); } };
exports.remove = async (req, res, next) => { try { const day = await ItineraryDay.findById(req.params.id); if (!day) throw new AppError('Itinerary day not found', 404); await ownedPackage(day.packageId, req.user); await ItineraryDay.findByIdAndDelete(day.id); res.json({ success: true, data: {} }); } catch (err) { next(err); } };
exports.duplicate = async (req, res, next) => { try { const day = await ItineraryDay.findById(req.params.id); if (!day) throw new AppError('Itinerary day not found', 404); await ownedPackage(day.packageId, req.user); const copy = await ItineraryDay.create({ ...day.toObject(), id: undefined, _id: undefined, title: `${day.title} (Copy)`, dayNumber: Number(day.dayNumber) + 1, sortOrder: Number(day.sortOrder) + 1 }); res.status(201).json({ success: true, data: copy }); } catch (err) { next(err); } };
exports.reorder = async (req, res, next) => { try { await ownedPackage(req.params.packageId, req.user); const ids = req.body.ids || []; await Promise.all(ids.map(async (id, index) => { const day = await ItineraryDay.findById(id); if (day && String(day.packageId) === String(req.params.packageId)) { day.sortOrder = index; day.dayNumber = index + 1; await day.save(); } })); res.json({ success: true }); } catch (err) { next(err); } };
