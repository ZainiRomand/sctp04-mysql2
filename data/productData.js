//DATA LAYER
const pool = require('../database');

async function getAllProducts() {
  const [rows] = await pool.query(`
    SELECT id, name, 
    CAST(price AS DOUBLE) AS price, 
    image FROM products`);
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [id]);
  return rows[0]; // we only want the first result
}

// Similar to
// export const getAllProducts() {...}
// export const getProductById() {...}
module.exports = {
  getAllProducts,getProductById
};