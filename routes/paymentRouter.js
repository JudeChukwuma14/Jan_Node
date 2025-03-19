const express = require("express")
const { payment, callBack } = require("../controller/paymentController")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()

router.post("/payment",verifyToken, payment)
router.get("/callback",verifyToken, callBack)


module.exports = router