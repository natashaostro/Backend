const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Private method: Read file and return content.
  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Public methods: Get all products from the file.
  async getProducts() {
    const fileContent = await this.#readFile();

    try {
      if (fileContent.length === 0) throw new Error(`Error: Not products found.`);
      else return fileContent;
    } catch (error) {
      console.log(`Error: Not products found.`);
    }
  }

  // Public methods: Get a product by id.
  async getProductById(id) {
    try {
      const fileContent = await this.#readFile();

      if (!fileContent.find((obj) => obj.id === id)) throw new Error(`Error: Not products found with id ${id}.`);
      else return fileContent.find((obj) => obj.id === id);
    } catch (error) {
      console.log(`Error: Not products found with id ${id}.`);
    }
  }
}

module.exports = ProductManager;