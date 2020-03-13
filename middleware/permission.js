// Middleware for using role-based permission
const User = require('../models/User');
const mongoose = require('mongoose');

// Gathers allowed roles args and checks whether user possesses one of them

module.exports = async function permit(req, res, next, ...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;
  try {
    const user = await User.findById(req.user.id);

    if (req.user && isAllowed(user.role)) {
      // Set local variable to be passed on via next for use in subsequent function.
      let isAdmin = user.role === 'admin' ? true : false;
      res.locals.isAdmin = isAdmin;
      next();
    } else {
      res.status(403).json({ msg: 'Forbidden' });
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
};
