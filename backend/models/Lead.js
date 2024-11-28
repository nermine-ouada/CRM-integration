const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    description :{
        type:String,
        required : [true,"lead description is required"],
    },
    statut :{
        type:String,
        required : [true,"lead statut is required"],
    }
},{
    timestamps:true,

});

const Lead = mongoose.model("Lead",userSchema);
module.exports=Lead;
