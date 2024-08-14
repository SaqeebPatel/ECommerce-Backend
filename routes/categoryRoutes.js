const express = require('express');
const router = express.Router();
const { createCategory,updateCategoryById,deleteCategoryById,getCategories} = require("../controllers/CategoryControllers");


router.post('/addcategory',createCategory);
router.put('/updatecategory/:id',updateCategoryById);
router.delete('/deletecategory/:id',deleteCategoryById);
router.get('/categories',getCategories);


module.exports = router;