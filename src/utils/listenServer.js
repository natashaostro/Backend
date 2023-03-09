const socketConfig = require("../socket/config");

const listenServer = (server, port) => {
  const httpServer = server.listen(port, () => {
    console.log("Server running on port", port);
  });

  return socketConfig(httpServer);
};

module.exports = listenServer;