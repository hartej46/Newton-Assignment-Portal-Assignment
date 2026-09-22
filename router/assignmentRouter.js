const express = require('express');
const {
    createAssignment,
    getAssignments,
    updateAssignment,
    deleteAssignment
} = require('../controller/assignmentController.js');

const router = express.Router();

router.post('/', createAssignment);
router.get('/', getAssignments);
router.patch('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);

module.exports = router;