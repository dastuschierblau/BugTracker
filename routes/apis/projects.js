const express = require('express');
const router = express.Router();

// @route   GET api/projects
// @desc    Test route
router.get('/', (req, res) => res.send('Projects route'));

module.exports = router;