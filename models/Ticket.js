const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project'
  },
  date: {
    type: Date, 
    default: Date.now
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'open'
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  history: [
    {
      time: {
        type: Date,
        default: Date.now
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);