const mongoose = require('mongoose');

const Product_schema =new mongoose.Schema({
     name:{
        type:String,
        require:true,
        unique: true    
        
     },
     description:{
        type:String,
        require:true,

     },
     price:{
        type:Number,
        require:true,

     },
     
     category:{
        type:String,
        require:true,

     }
     
})

const products = mongoose.model("products",Product_schema)

module.exports = {products}