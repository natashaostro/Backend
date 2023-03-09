const { Router } = require("express");
const handlebarsRouter = Router();
const FileManager = require("../managers/fileManager");

const fileManager = new FileManager("./src/database/products.json");

handlebarsRouter.get("/", async (req, res) => {
  const products = await fileManager.getData();

  try {
    res.render("home", {
      title: "Home | Handlebars",
      products,
      style: "style",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

handlebarsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts", {
      title: "Realtime Products | Handlebarss",
      style: "style",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});



module.exports = handlebarsRouter;