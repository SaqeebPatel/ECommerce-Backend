const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProduct, updateProductById,deleteProductById,getAllProducts } = require('../controllers/ProductControllers');


router.post('/addproduct',createProduct);
router.put('/update/:id',updateProductById);
router.delete('/delete/:id',deleteProductById);
router.get('/getProducts',getAllProducts);



module.exports = router;