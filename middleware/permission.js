// Middleware for using role-based permission
const User = require('../models/User');
const mongoose = require('mongoose');

// Gathers allowed roles args and checks whether user possesses one of them

module.exports = async function permit(req, res, next, ...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;
  try {
    const user = await User.findById(req.user.id);

    if (req.user && isAllowed(user.role)) {
      // Set local variable isAdmin to be passed on via next for use in subsequent function.
      // This will allow override of certain access restrictions such that they do not apply to an admin.
      // For use in routes / functionality that do allow other user types to utilize them, but only under certain conditions.
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
