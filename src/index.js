require("dotenv").config();
const InitialServer = require("./src/models/server");

const server = new InitialServer();
server.start();