class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    #checkProduct(product) {
      return !!product.title && !!product.description && !!product.price && !!product.thumbnail && !!product.code && !!product.stock; 
    }
  
    addProduct(product) {
      if (this.#checkProduct(product) && !this.products.find(p => p.code === product.code)) {
        this.products.push({ ...product, id: this.products.length + 1 });
        return console.log(`Product added: ${product.title}`)
      } else {
        return console.log(`Este producto ${product.title} no existe.`);
      }
    }
  
    getProductById(id) {
      const findById = this.products.find(p => p.id === id);
  
      if (findById) return findById;
      else return console.log(`Este producto ${id} no existe.`);
    }
  
  }
  
  module.exports = { ProductManager };