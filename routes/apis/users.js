const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permission');

const User = require('../../models/User');

// @route   GET api/users
// @desc    Get full list of users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route   GET api/users/:user_id
// @desc    Get user by id
router.get('/:user_id', auth, async (req, res) => {
  try {
    const user = await User.findById( req.params.user_id );

    if(!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Register user
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({ errors: [ { msg: 'User already exists' }] })
    }

    user = new User({
      name,
      email,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      }
    );

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

});

// Edit role of target user. Only accessible to users with role of 'admin'.
router.post('/edit', auth, (req, res, next) => {
  permit(req, res, next, "admin");
}, async (req, res) => {
  const { target, value } = req.body;
  let user = await User.findById(target).select('-password');

  if(user) {
    user.role = value;
    await user.save();
  }

  res.json({ currentUser: req.user, targetUser: user });
});


module.exports = router;