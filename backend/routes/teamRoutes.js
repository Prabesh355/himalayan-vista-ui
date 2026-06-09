const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', teamController.getAllTeamMembers);
router.get('/admin/all', protect, authorize('admin'), teamController.getAllTeamMembersAdmin);
router.post('/', protect, authorize('admin'), teamController.createTeamMember);
router.put('/:id', protect, authorize('admin'), teamController.updateTeamMember);
router.delete('/:id', protect, authorize('admin'), teamController.deleteTeamMember);

module.exports = router;