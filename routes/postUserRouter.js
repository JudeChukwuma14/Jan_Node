const express = require("express")
const { postAds } = require("../controller/postUserController")
const verifyToken = require("../middleware/verifyToken")
const upload = require("../middleware/multer")
const router = express.Router()
router.post("/postads",upload, postAds)

module.exports = router