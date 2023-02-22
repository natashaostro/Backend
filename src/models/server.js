const express = require("express");
const CORS = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.productsPath = "/products";
  }

  // Middlewares
  middlewares() {
    this.app.use(CORS());
    this.app.use(express.json());
  }

  // Routes
  routes() {
    this.app.use(this.productsPath, require("../routes/products.route"));
  }

  // Listen server
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }

  start() {
    this.middlewares(); 
    this.routes(); 
    this.listen();
  }
}

module.exports = Server;