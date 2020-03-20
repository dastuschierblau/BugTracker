const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permission');
const Project = require('../../models/Project');
const { check, validationResult } = require('express-validator');
const Ticket = require('../../models/Ticket');
const User = require('../../models/User');

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

// @route    GET api/projects/tickets
// @desc     Get all tickets
// @access   All
router.get('/tickets', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/:project_id
// @desc    Get project by id
router.get('/:project_id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.project_id);

    if (!project) {
      return res.status(400).json({ msg: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects
// @desc    Add a project
// @access  Only admins and project managers may add projects.
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty()
  ],
  auth,
  (req, res, next) => {
    permit(req, res, next, 'admin', 'manager');
  },
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    const manager = req.user.id;

    let project = new Project({
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
  }
);

// @route   DELETE api/projects/:project_id
// @desc    Delete a project and associated tickets.
// @access  Only admins and project managers may delete projects.
router.delete(
  '/:project_id',
  auth,
  (req, res, next) => {
    permit(req, res, next, 'admin', 'manager');
  },
  async (req, res) => {
    const projectId = req.params.project_id;

    let isAdmin = res.locals.isAdmin;

    // Check whether user is either an admin or is a project manager who is assigned to / created this project.
    // If user is project manager who did not create this project, they will not be permitted to delete it.
    try {
      let project = await Project.findById(projectId);

      if (isAdmin || project.manager === req.user.id) {
        try {
          await Ticket.deleteMany({ project: projectId });
          await Project.findOneAndRemove({ _id: projectId });

          res.json({ msg: 'Project and tickets deleted' });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      } else {
        res.status(403).json({
          msg: 'Only admins or owners of a project may delete a project.'
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/projects/:project_id
// @desc    Create a new ticket
// @access  Admin, project managers, and developers
router.post(
  '/:project_id',
  [
    check('description')
      .not()
      .isEmpty(),
    check('priority')
      .not()
      .isEmpty(),
    check('assignedTo')
      .not()
      .isEmpty(),
    check('category')
      .not()
      .isEmpty()
  ],
  auth,
  (req, res, next) => {
    permit(req, res, next, 'admin', 'manager', 'developer');
  },
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, category, assignedTo, priority, date } = req.body;
    const project = req.params.project_id;
    const submittedBy = req.user.id;

    let ticketFields = {
      description,
      project,
      category,
      assignedTo,
      priority,
      date,
      submittedBy,
      history: []
    };

    if (req.body.comments) {
      ticketFields.comments = req.body.comments;
    }

    ticketFields.history.push({
      user: submittedBy,
      description: `Created ticket with initial settings: 
      Category: ${category}, Assigned to: ${assignedTo}, Priority: ${priority}`
    });

    let ticket = new Ticket(ticketFields);

    try {
      await ticket.save();

      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/projects/:project_id/tickets
// @desc    Get all tickets for a given project
// @access  All
router.get('/:project_id/tickets', auth, async (req, res) => {
  const project = req.params.project_id;

  try {
    let tickets = await Ticket.find({ project });

    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/:project_id/tickets/:ticket_id
// @desc    Get a single ticket with ticket_id
// @access  All
router.get('/:project_id/tickets/:ticket_id', auth, async (req, res) => {
  const ticketId = req.params.ticket_id;

  try {
    let ticket = await Ticket.findById(ticketId);

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/projects/tickets/:ticket_id
// @desc   Edit a ticket
// @access Admin, project manager, developer
router.put(
  '/tickets/:ticket_id',
  auth,
  (req, res, next) => {
    permit(req, res, next, 'admin', 'manager', 'developer');
  },
  async (req, res) => {
    const user = req.user.id,
      ticketId = req.params.ticket_id;

    try {
      let ticket = await Ticket.findById(ticketId);

      if (req.body.status) {
        ticket.status = req.body.status;
        ticket.history.push({
          user,
          description: `Changed status to ${req.body.status}`
        });
      }

      if (req.body.priority) {
        ticket.priority = req.body.priority;
        ticket.history.push({
          user,
          description: `Changed priority to ${req.body.priority}`
        });
      }

      if (req.body.assignedTo) {
        try {
          let assignedUser = await User.findById(req.body.assignedTo);

          ticket.assignedTo = assignedUser;
          ticket.history.push({
            user,
            description: `Changed assigned user to ${assignedUser.name}`
          });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }

      if (req.body.category) {
        ticket.category = req.body.category;
        ticket.history.push({
          user,
          description: `Changed category of ticket to ${req.body.category}`
        });
      }

      await ticket.save();

      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  PUT api/projects/tickets/:ticket_id/comments
// @desc   Add a comment to a ticket
// @access All
router.post(
  '/tickets/:ticket_id/comments',
  [
    check('text')
      .not()
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.user.id,
      ticketId = req.params.ticket_id;

    try {
      let ticket = await Ticket.findById(ticketId);

      let comment = {
        user,
        text: req.body.text
      };

      ticket.comments.push(comment);
      ticket.history.push({
        user,
        description: `Added a comment.`
      });

      await ticket.save();

      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/projects/:project_id/tickets/:ticket_id
// @desc     Delete a ticket
// @access   Admin and project managers
router.delete(
  '/:project_id/tickets/:ticket_id',
  auth,
  (req, res, next) => {
    permit(req, res, next, 'admin', 'manager');
  },
  async (req, res) => {
    let ticketId = req.params.ticket_id;

    try {
      await Ticket.findOneAndRemove({ _id: ticketId });

      res.json('Ticket deleted');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
