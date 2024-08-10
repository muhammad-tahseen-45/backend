const express = require("express")
const { user_regester, user_login, checl_user_verification } = require("../controller/User_Controller")

const User_reg_routes = express.Router()

User_reg_routes.post("/add",user_regester)
User_reg_routes.post("/login",user_login)
User_reg_routes.get("/check_user",checl_user_verification)

module.exports = User_reg_routes