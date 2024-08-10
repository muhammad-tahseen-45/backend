const mongoose = require('mongoose');

const User_schema = new mongoose.Schema({
    User_name :{
        require:[true,"user name is compulsury fill"],
        unique: [true,"user name should be unique try another username "],
        type:String,
        lowercase:true

    },
    
     name :{
        require:true,
        type:String,

    },
    age:{
       type:Number,
       min:[10,"minimum age is 10 require"],
       max:[80,"max age is 80 require"]
    },
    phone_number:{
        type:String,
        unique:true
        
    },
     email :{
        require:[true,"email should be require"],
        unique: [true,"email should be unique try another email"],
        type:String,
        lowercase:true

    },
     password :{
        require:[true,"password should be require"],
        type:String,
        

    },
    

})

const User_collection = mongoose.model("users",User_schema);

module.exports = User_collection