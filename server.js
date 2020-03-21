const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'favicon.ico'],
      scriptSrc: ["'self'"]
    }
  })
);
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/apis/users'));
app.use('/api/auth', require('./routes/apis/auth'));
app.use('/api/projects', require('./routes/apis/projects'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
