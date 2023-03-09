const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class FileManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Private method: Read file and return content.
  async #readFile() {
    try {
      // Read the file.
      const readFile = await fs.promises.readFile(this.path, "utf-8");

      // if (readFile.length === 0) res.status(200).json([{ message: "No data found." }]);
      if (readFile.length === 0) return [];
      else return JSON.parse(readFile);
      return JSON.parse(readFile);
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  // Public methods: Get all data from the file.
  async getData() {
    const fileContent = await this.#readFile();

    try {
      // if (fileContent.length === 0) throw new Error(`Error: Not data found.`);
      if (fileContent.length === 0) return [];
      else return fileContent;
    } catch (error) {
      throw new Error(`Error: Not data found.`);
    }
  }

  // Public methods: Get a data by id.
  async getDataById(id) {
    const fileContent = await this.#readFile();

    try {
      const data = fileContent.some((obj) => obj.id === id);

      if (data) {
        const dataById = fileContent.find((obj) => obj.id === id);
        return dataById;
      } else {
        throw new Error(`Error: Not data found with id ${id}.`);
      }
    } catch (error) {
      throw new Error(`Error: Not data found with id ${id}.`);
    }
  }

  // Public methods: Post a new data.
  async postData(data) {
    // Read the file.
    const fileContent = await this.#readFile();

    try {
      // Create a new object with the 
      const newItem = { id: uuidv4(), ...data };

      // Write the new object in the file.
      await fs.promises.writeFile(this.path, JSON.stringify([...fileContent, newItem], null, 2));
      
      // Return the new object.
      return newItem;
    } catch (error) {
      throw new Error(`Error saving data: ${error.message}`);
    }

  }

  // Public methods: Update a data by id.
  async updateDataById(id, data) {
    // Read the file.
    const fileContent = await this.#readFile();

    try {
      // Find the data by id.
      const dataById = await this.getDataById(id);

      if (dataById) {
        // Write the new object in the file.
        await fs.promises.writeFile(this.path, JSON.stringify(fileContent.map((obj) => obj.id === id ? { ...obj, ...data } : obj), null, 2));

        // Return the new object.
        return { id, ...data };
      } else {
        throw new Error(`Error: Not data found with id ${id}.`);
      }
    } catch (error) {
      throw new Error(`Error: Not data found with id ${id}.`);
    }
  }

  // Public methods: Delete a data by id.
  async deleteDataById(id) {
    // Read the file.
    const fileContent = await this.#readFile();

    try {
      // Find the data by id.
      const dataById = await this.getDataById(id);

      if (dataById) { 
        // Write the new object in the file.
        fs.promises.writeFile(this.path, JSON.stringify(fileContent.filter((obj) => obj.id !== id), null, 2));

        // Return the new object.
        return { id, ...dataById, status: false };
      } else {
        return { error: `Not data found with id ${id}.` };
      }
    } catch (error) {
      throw new Error(`Error deleting data: ${error.message}`);
    }
  }
}

module.exports = FileManager;