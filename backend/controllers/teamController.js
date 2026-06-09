const Team = require('../models/Team');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.getAllTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await Team.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: teamMembers });
  } catch (error) {
    next(error);
  }
};

exports.getAllTeamMembersAdmin = async (req, res, next) => {
  try {
    const teamMembers = await Team.find().sort({ sortOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: teamMembers.length, data: teamMembers });
  } catch (error) {
    next(error);
  }
};

exports.createTeamMember = async (req, res, next) => {
  try {
    const member = await Team.create({
      name: req.body.name,
      role: req.body.role,
      bio: req.body.bio || '',
      avatar: req.body.avatar || '',
      isActive: req.body.isActive !== false,
      sortOrder: Number(req.body.sortOrder || 0),
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, message: 'Team member created successfully', data: member });
    logger.info(`Team member created: ${member.name} by ${req.user.id}`);
  } catch (error) {
    next(error);
  }
};

exports.updateTeamMember = async (req, res, next) => {
  try {
    let member = await Team.findById(req.params.id);
    if (!member) {
      return next(new AppError('Team member not found', 404));
    }

    member = await Team.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        sortOrder: req.body.sortOrder != null ? Number(req.body.sortOrder) : member.sortOrder,
      },
      { new: true, runValidators: true },
    );

    res.status(200).json({ success: true, message: 'Team member updated successfully', data: member });
    logger.info(`Team member updated: ${member.name}`);
  } catch (error) {
    next(error);
  }
};

exports.deleteTeamMember = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return next(new AppError('Team member not found', 404));
    }

    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Team member deleted successfully', data: {} });
    logger.info(`Team member deleted: ${member.name}`);
  } catch (error) {
    next(error);
  }
};