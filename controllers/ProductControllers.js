const Product = require("../models/productModel");
4;
const Category = require("../models/category");

async function createProduct(req, res) {
    const { ProductName, category, price, available, quantity, createdBy } = req.body;
    try {
      // Check if the category exists
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).send({ error: "Invalid Category" });
      } 
  
      // Check if a product with the same name already exists
      const product = await Product.findOne({ ProductName });
      if (product) {
        return res.status(400).send("Product already exists");
      }
  
      // Create a new product
      const newProduct = new Product({
        ProductName,
        category,
        price,
        available,
        quantity,
        createdBy,
      });
  
      // Save the new product to the database
      await newProduct.save();
      res.json({ msg: "Product added successfully" });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Something went wrong" });
    }
  }

async function updateProductById(req, res) {
  const { ProductName, category, price, quantity } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ProductName, category, price, quantity },
      { new: true }
    );
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.json({ msg: "Product updated", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
}

async function deleteProductById(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.json({ msg: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
}

module.exports = {
  createProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
};