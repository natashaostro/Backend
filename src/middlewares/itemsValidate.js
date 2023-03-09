const ItemsValidate = (req, res, next) => {
    const { title, description, code, stock, category, price } = req.body;
  
    try {
      if (!title || !description || !code || !stock || !category || !price) return res.status(400).json({ error: "Some of the fields are empty." });
      else if (price < 0) return res.status(400).json({ error: "The price must be greater than 0." });
      else if (stock < 0) return res.status(400).json({ error: "The stock must be greater than 0." });
      else next();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = ItemsValidate;