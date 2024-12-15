const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({

    name :{
        type:String,
        required : [true,"User name is required"],
    },
    
    email: {
        type:String,
        required: [true,"User email is required"],
        unique: [true, "User email is unique"]
    },
    password: {
        type:String,
        required: [true,"User password is required"],
        unique: [true, "User password is unique"]

    },
    role: {
        type:String,
        required: [true,"User role is required"],
    }
},{
    timestamps:true,

});



const User = mongoose.model("User",postSchema);
module.exports=User;
