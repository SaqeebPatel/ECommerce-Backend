const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const {register ,login} =require('../controllers/UserControllers')



router.post('/adduser',register);
router.post('/login',login);



module.exports = router;