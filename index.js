const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./database');

// make sure this comes AFTER dotenv config
const productsRouter = require('./routes/products');

const app = express();

// Middleware
app.use(express.json());
// only works for web-site
app.use(cors()); 

app.get('/', (req, res) => {
  res.json({ 
    message: "Welcome to the API" 
    });
});

// Routes
// If a request which URL begin with '/api/prodcuts
app.use('/api/products', productsRouter);

// Start the server
// we can specify the PORT in the .env file
// PORT => virtual port, usually meant for networking
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});