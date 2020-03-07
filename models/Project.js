const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = Project = mongoose.model('project', ProjectSchema);