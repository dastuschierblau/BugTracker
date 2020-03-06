const express = require('express');
const router = express.Router();

// @route   GET api/tickets
// @desc    Test route
router.get('/', (req, res) => res.send('Tickets route'));

module.exports = router;