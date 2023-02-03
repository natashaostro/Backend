const { labial, remera } = require("./info/products");
const { ProductManager } = require("./class/ProductManager");

const productManager = new ProductManager();


console.log(productManager.getProducts());


productManager.addProduct(remera);


console.log(productManager.getProducts());


productManager.addProduct(labial);

productManager.getProductById(11);