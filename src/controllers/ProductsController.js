// Import ProductManager class.
const ProductManager = require("../container/ProductManager");

// Instantiate ProductManager class.
const productManager = new ProductManager("./src/database/db.json");

class ProductsController {
  async getProducts(req, res) {
    try {
      const products = await productManager.getProducts();
      const { limit } = req.query;

      if (limit) {
        const limitProducts = products.slice(0, parseInt(limit));
        res.status(200).json(limitProducts);
      } else {
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productManager.getProductById(parseInt(id));

      if (!product)
        res.status(404).json({ error: `Product with id ${id} not found.` });
      else res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductsController;