const express = require("express")
const cookieParser = require('cookie-parser');
// const router = require("./router/router_for_Practic")
const dbconnect = require("./database/db")
require("dotenv").config()
// const Product_router = require("./router/Product_data_router")
// const User_reg_routes = require("./router/User_regester_routes");
const router = require("./router/router_for_Practic");






const app = express()
app.use(express.json())
app.use(cookieParser())

// app.use(router)
app.use("/",router)

// app.use("/user_reg",User_reg_routes)
// dbconnect() 

// main()
app.listen(process.env.PORT,()=>{
    console.log(`server is runing ${process.env.PORT} ` )
})