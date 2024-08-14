const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    }
});

userSchema.pre('save',async function(next){
    const user=this;
    // const salt=await bcrypt.genSalt(10);
    if(user.isModified('password')){
    this.password=await bcrypt.hash(user.password,8);
    }
    next();
});

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const User=mongoose.model('User',userSchema);

module.exports=User;



// {"username":"saqeeb",
//     "email":"saqeeb@gmail.com",
//     "password":"111",
//     "mobileNumber":"12345",
//     "role":"admin"}