
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");
// const app = express();
// port = 4000;

// mongoose.connect(
//   "mongodb+srv://saqeeb3p:saqeeb3p@cluster0.4mfw9fs.mongodb.net/Ecommerce"
// );

// mongoose.connection.once("open", () => {
//   console.log("MongoDB Connected");
// });

// app.use(express.json());
// app.use('/api',userRoutes)


// app.listen(port, () => {
//   console.log(`http://localhost:4000S`);
// });


const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const productRoutes=require('./routes/productRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes=require('./routes/userRoute');
require('dotenv').config();

const app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once('open',()=>{
    console.log('connected to MongoDB database');
});


//userRoute
app.use('/api/users',userRoutes);

//CategoryRoute 
app.use('/api/categories',categoryRoutes);

// ProductsRoute
app.use('/api/products',productRoutes);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});