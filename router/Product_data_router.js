const express = require("express")
const { Send_data, Read_data, Update_data, delet_data } = require("../controller/Product_data_controller")
const { checl_user_verification } = require("../controller/User_Controller")

const  Product_router = express.Router()

// Product_router.post("/",Send_data)
Product_router.get("/products",Read_data)
// Product_router.put("/:id",Update_data)
// Product_router.delete("/:id",delet_data)



module.exports = Product_router


