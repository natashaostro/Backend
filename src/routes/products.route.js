const { Router } = require("express");
const ProductsController = require("../controllers/ProductsController");
const router = Router();

const productsController = new ProductsController();

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);

module.exports = router;