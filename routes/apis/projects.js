const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permission');
const Project = require('../../models/Project');
const { check, validationResult } = require('express-validator');


// @route    GET api/projects
// @desc     Get all projects
// @access   All
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/:project_id
// @desc    Get project by id
router.get('/:project_id', auth, async (req, res) => {
  try {
    const project = await Project.findById( req.params.project_id );

    if(!project) {
      return res.status(400).json({ msg: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects
// @desc    Add a project
// @access  Only admins and project managers may add projects.
router.post('/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],  
  auth, 
  (req, res, next) => {
  permit(req, res, next, "admin", "manager");
},
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, description } = req.body;
  const manager = req.user.id;

  let project = new Project ({
    name,
    description,
    manager
  });

  try {
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  
});

// @route   DELETE api/projects/:project_id
// @desc    Delete a project
// @access  Only admins and project managers may delete projects.
// TODO: Delete all associated tickets and comments
router.delete('/:project_id', auth, (req, res, next) => {
  permit(req, res, next, "admin", "manager");
}, async (req,res) => {
  try {
    await Project.findOneAndRemove({ _id: req.params.project_id });

    res.json({ msg: 'Project deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;