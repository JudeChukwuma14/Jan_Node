const express = require("express")
const { createUser, loginUser, Logout } = require("../controller/authController")
const router = express.Router()
router.post("/createuser",createUser)
router.post("/loginuser",loginUser)
router.get("/logout", Logout)
module.exports = router