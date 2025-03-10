const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // only works for web-site

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: "Welcome to the API" 
    });
});

// Start the server
// we can specify the PORT in the .env file
// PORT => virtual port, usually meant for networking
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});