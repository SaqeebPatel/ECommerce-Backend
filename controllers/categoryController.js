

const mongoose = require("mongoose");

const categorymodel = require("../models/category");

// **********************************************
// Add Category
async function addcategory(req, res) {
  console.log(req.body);
  const userid = req.user.id;
  const { categoryname, createdBy } = req.body;
  try {
    const existingcategory = await categorymodel.findOne({ categoryname });
    if (existingcategory) {
      return res.status(400).json({ message: "Category Already Exists" });
    } else {
      const newcategory = new categorymodel({
        categoryname,
        createdBy:req.user.id,
        createdAt: Date.now(),
      });
      await newcategory.save();
      res.status(201).json({ message: "Category Added Sucessfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// ******************************************
// Get all category by id
async function getcategorybyid(req, res) {
  // console.log(req.body);
  const { id } = req.params;
  try {
    const category = await categorymodel.findById(id);
    console.log(id);
    if (!category) {
      res.status(404).send({ msg: "category id is not found" });
    }
    return res.status(201).send({ msg: "This is category", product });
  } catch (error) {
    res.status(500).send(error);
  }
}

// *******************************************
// Get all category
async function getcategory(req, res) {
  console.log(req.body);
  try {
    const category = await categorymodel.find();
    res.status(201).send({ message: "This is all product", category });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// ************************************************
async function deletecategory(req, res) {
  console.log(req.body);
  const { id } = req.params;
  console.log(req.params.category);
  try {
    const category = await categorymodel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// *************************************************

   async function updatecategory (req, res)  {
  const { categoryname, createdBy } = req.body;
  const { id } = req.params;

  try {
    const category = await categorymodel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    category.categoryname = categoryname || category.categoryname;
    category.createdBy = createdBy || category.createdBy;
    await category.save();

    res.status(200).json({ message: "Category Updated Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addcategory,
  getcategorybyid,
  getcategory,
  updatecategory,
  deletecategory,
};