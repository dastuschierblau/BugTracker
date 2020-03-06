const express = require('express');
const router = express.Router();

// @route   GET api/comments
// @desc    Test route
router.get('/', (req, res) => res.send('Comments route'));

module.exports = router;