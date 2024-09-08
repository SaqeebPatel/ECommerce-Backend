const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { productname, category, price, availability, quantity, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Check if the product already exists (optional)
    let product = await Product.findOne({ productname });
    if (product) {
      return res.status(400).json({ msg: "Product already exists" });
    }

    // Create a new product instance
    product = new Product({
      productname,
      image,
      description,
      category,
      price,
      availability,
      quantity,
      createdBy: req.user.id,
    });

    // Save the product to the database
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // Assuming you want to populate category details

    const modifiedProducts = products.map((product) => ({
      id: product._id,
      productname: product.productname,
      image: product.image
        ? `http://localhost:5000/uploads/${product.image}`
        : null,
      category: product.category,
      price: product.price,
      availability: product.available ? "InStock" : "OutOfStock",
      quantity: product.quantity,
      description: product.description || "No description available.",
      updatedAt: product.updatedAt || product.createdAt,
    }));

    res.status(200).send(modifiedProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
    }).populate("category");
    if (!products) {
      return res
        .status(404)
        .json({ msg: "No products found for this category" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// // Updated Product
exports.updateproduct = async (req, res) => {
  try {
    const { productname, category, price, available, quantity , description} = req.body;
    const id = req.params.id;
    console.log(req.body);
    console.log(req.params.id);

    console.log("id here", id);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product.productname = productname || product.productname;
    product.category = category || product.category;
    product.price = price || product.price;
    product.available = available !== undefined ? available : product.available;
    product.quantity = quantity || product.quantity;
    product.description= quantity || product.description 
    await product.save();
    res.status(201).send({ msg: "Product updated successfully", product });
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
};

// ******************************************
// Delete Product
exports.deleteproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
