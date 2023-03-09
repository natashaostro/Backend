const express = require("express");
const path = require("path") ;
const loadRoutes = require("../utils/loadRoutes");
const hbsConfig = require("../lib/handlebars");
const socketConfig = require("../socket/config");
const listenServer = require("../utils/listenServer");

class InitialServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
  }

  #viewEngine() {
    hbsConfig(this.app);
  }

  #middlewares() {
    this.app.use(express.static(path.join("public")));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  #routes() {
    loadRoutes(this.app);
  }

  #listen() {
    listenServer(this.app, this.port);
  }

  start() {
    this.#middlewares();
    this.#routes();
    this.#viewEngine();
    this.#listen();
  }
} 

module.exports = InitialServer;