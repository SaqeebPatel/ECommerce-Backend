const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    ProductName:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }, 
    createdAt:{
        type:Date,
        default:Date.now
    },
  
});

const Product=mongoose.model('Product',productSchema);

module.exports=Product;
