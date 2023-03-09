const { Router } = require("express");
const cartRouter = Router();

// Instantiate the class.
const FileManager = require("../managers/fileManager");

// Create a new instance of the class.
const fileManagerCarts = new FileManager("./src/database/carts.json");
const fileManagerProducts = new FileManager("./src/database/products.json");

// Cart Model.
const CartModel = require("../models/cart.model");

cartRouter.get("/", async (req, res) => {
  try {
    const carts = await fileManagerCarts.getData();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await fileManagerCarts.getDataById(cid);

    if (cart) res.status(200).json(cart);
    else res.status(404).json({ error: `Not data found with id ${cid}.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartRouter.post('/', async (req, res) => {
  const cart = new CartModel([]);

  try {
    const newCart = await fileManagerCarts.postData(cart);
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const [product, cart] = await Promise.all([
      fileManagerProducts.getDataById(pid),
      fileManagerCarts.getDataById(cid),
    ]);

    if (!product) return res.status(404).json({ error: `No data found with id ${pid}.` });

    const productInCart = cart.products.find((p) => p.product === product.id);

    if (productInCart) productInCart.quantity += 1;
    else cart.products.push({ product: product.id, quantity: 1 });

    await fileManagerCarts.updateDataById(cid, cart);

    res.status(200).json(`Product ${pid} added to cart ${cid}.`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = cartRouter;