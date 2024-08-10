const express = require("express")
const { reading_data, rec_data} = require("../controller/controller")
const router = express.Router()


router.get("/",reading_data)
router.post("/rec",rec_data)


module.exports = router