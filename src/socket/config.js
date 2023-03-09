const { Server } = require("socket.io");
const FileManager = require("../managers/fileManager");

const fileManager = new FileManager("./src/database/products.json");

const socketConfig = (httpServer) => {
  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    // User connected.
    console.log(`user connected: ${socket.id}`);

    // Get products from file.
    const products = await fileManager.getData();

    // Send products to client.
    socket.emit("newProduct", products);

    // Listen for addProduct event.
    socket.on("addProduct", async (product) => {

      // Add product to file.
      await fileManager.postData(product);

      // Get products from file.
      const products = await fileManager.getData();

      // Send products to client.
      io.sockets.emit("newProduct", products);

      // Send products to all clients except the one that sent the event.
      socket.broadcast.emit("newProduct", products);
    });

    // Listen for deleteProduct event.
    socket.on("deleteProduct", async (id) => {

      // Delete product from file.
      await fileManager.deleteDataById(id);

      // Get products from file.
      const products = await fileManager.getData();

      // Send products to client.
      io.sockets.emit("newProduct", products);

      // Send products to all clients.
      socket.broadcast.emit("newProduct", products);
    });
  })
};

module.exports = socketConfig;