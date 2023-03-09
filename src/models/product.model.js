class ProductModel {
    constructor(title, description, code, stock, category, price, files) {
      this.title = title;
      this.description = description;
      this.code = code;
      this.stock = stock;
      this.category = category;
      this.price = price;
      this.files = files;
      this.status = true;
    }
  }
  
  module.exports = ProductModel;