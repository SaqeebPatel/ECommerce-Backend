// const Category = require('../models/Category');

// exports.createCategory = async (req, res) => {
//     try {
//         const { categoryName } = req.body;
//         const category = new Category({ categoryName, createdBy: req.user.id });
//         await category.save();
//         res.json(category);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// exports.getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.json(categories);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// exports.updateCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { categoryName } = req.body;
//         let category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({ msg: 'Category not found' });
//         }
//         category.categoryName = categoryName;
//         category = await category.save();
//         res.json(category);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// exports.deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({ msg: 'Category not found' });
//         }
//         await category.remove();
//         res.json({ msg: 'Category removed' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };



// const Category = require('../models/Category');

// exports.createCategory = async (req, res) => {
//     console.log(req.body);
//     try {
//         const { name } = req.body;

//         // Check if the category already exists
//         const existingCategory = await Category.findOne({ name });
//         if (existingCategory) {
//             return res.status(400).json({ message: 'Category already exists' });
//         }

       
//         const category = new Category({
//             name,
//             createdBy: req.user.id 
//         });

//         const savedCategory = await category.save();
//         res.status(201).send(savedCategory);
//     } catch (error) {
//         res.status(500).send({ message: 'Error creating category', error });
//     }
// };

// exports.getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.status(200).send({categories:categories});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// exports.updateCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { categoryName } = req.body;
//         let category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({ msg: 'Category not found' });
//         }
//         category.categoryName = categoryName;
//         category = await category.save();
//         res.json(category);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// exports.deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({ msg: 'Category not found' });
//         }
//         await category.remove();
//         res.json({ msg: 'Category removed' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };




const mongoose = require("mongoose");

const categorymodel = require("../models/category");

// **********************************************
// Add Category
async function addcategory(req, res) {
  console.log(req.body);
  const { categoryname, createdBy } = req.body;
  try {
    const existingcategory = await categorymodel.findOne({ categoryname });
    if (existingcategory) {
      return res.status(400).json({ message: "Category Already Exists" });
    } else {
      const newcategory = new categorymodel({
        categoryname,
        createdBy,
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
  console.log(req.body);
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
// Delete Category
async function deletecategory(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const category = await categorymodel.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: "Category Not Found" });
    }
    res.status(201).json({ message: "Category Deleted Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// *************************************************
// Update category
async function updatecategory(req, res) {
  console.log(req.body);
  const { categoryname, createdBy } = req.body;
  const { id } = req.params;

  try {
    const category = await categorymodel.findByIdAndUpdate(id);
    if (!category) {
      res.status(404).json({ message: "Category Not Found" });
    }
    category.categoryname = categoryname || category.categoryname;
    category.createdBy = createdBy || category.createdBy;
    await category.save();
    res.status(201).send({ message: "Category Updated Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addcategory,
  getcategorybyid,
  getcategory,
  updatecategory,
  deletecategory,
};