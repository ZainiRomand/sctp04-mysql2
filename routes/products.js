// ROUTER LAYER
//all CRUD routes pertaining to
// products will be placed in this file
const express = require('express');
const router = express.Router();
const productService = require('../services/productServices');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.log(e);
    res.status(500).json({ message: error.message });
  }
});

// GET a single product
router.get('/:id', async (req, res) => {
  try {
    console.log(e);
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;