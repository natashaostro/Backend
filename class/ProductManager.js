const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Private method: Read file and return content.
  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.path, 'utf-8');
      const parseContent = JSON.parse(content);
      return parseContent;
    } catch (error) {
      console.log(error);
    }
  }

  // Private method: Check if product code exists.
  async #checkProductCode(code) {
    const fileContent = await this.#readFile();
    return fileContent.find((objeto) => objeto.code === code);
  }

  // Public methods: Add a product to the file.
  async addProduct(obj) {
    const fileContent = await this.#readFile();
    if (await this.#checkProductCode(obj.code)) return console.log(`Error: product with code ${obj.code} already exists.`)

    try {
      if (fileContent.length !== 0) await fs.promises.writeFile(this.path, JSON.stringify([...fileContent, { ...obj, id: fileContent[fileContent.length - 1].id + 1 },], null, 2), "utf-8");
      else await fs.promises.writeFile(this.path, JSON.stringify([{ ...obj, id: 1 }]), "utf-8");
    } catch (error) {
      console.log(error);
    }
  }
  

  // Public methods: Get all products from the file.
  async getProducts() {
    const fileContent = await this.#readFile();

    try {
      console.log(fileContent);
    } catch (error) {
      console.log(`Error: Not products found.`);
    }
  }

  // Public methods: Get a product by id.
  async getProductById(id) {
    try {
      const fileContent = await this.#readFile();

      if (!fileContent.find((objeto) => objeto.id === id)) throw new Error(`Error: Not products found with id ${id}.`);
      else console.log(fileContent.find((objeto) => objeto.id === id));      
    } catch (error) {
      console.log(`Error: Not products found with id ${id}.`);
    }
  }

  // Public methods: Update a product by id.
  async updateProduct(id, obj) {
    try {
      const fileContent = await this.#readFile();
      const updated = fileContent.map((product) => product.id === id ? { ...product, ...obj } : product);

      if (!fileContent.find((objeto) => objeto.id === id)) throw new Error(`Error: Not products found with id ${id}.`);
      else await fs.promises.writeFile(this.path, JSON.stringify(updated, null, 4));

    } catch (error) {
      console.log(`Error: could not update product with id ${id}.`);
    }
  }

  // Public methods: Delete a product by id.
  async deleteProductById(id) {
    try {
      const fileContent = await this.#readFile();
      const updated = fileContent.filter((product) => product.id !== id);

      if (!fileContent.find((obj) => obj.id === id)) throw new Error(`Error: Not products found with id ${id}.`);
      else await fs.promises.writeFile(this.path, JSON.stringify(updated, null, 4)); 
    } catch (error) {
      console.log(`Error: could not delete product with id ${id}.`);
    }
  }

  // Public methods: Delete all products.
  async deleteAll() {
    await fs.promises.writeFile(this.path, JSON.stringify([]), 'utf-8');
  }
}

module.exports = ProductManager;