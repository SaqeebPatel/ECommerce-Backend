const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    CategoryName:{
        type:String,
        required:false
    },
    createdBy:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const categories=mongoose.model('Category',CategorySchema);

module.exports=categories;
