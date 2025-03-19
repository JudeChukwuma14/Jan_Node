const { initializePayment, verifyPaymentStatus } = require("../middleware/paystackAPI")
const userModel = require("../model/authModel")
const cartModel = require("../model/cartModel")
const checkoutModel = require("../model/checkOutModel")


const payment = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect("/login")
        }
        const userId = req.user.id
        const currentUser = await userModel.findOne({ _id: userId })
        const userProduct = await cartModel.find({ userId: userId }).populate("postadId")
        let totalAmount = 0
        userProduct.forEach(item => {
            totalAmount += item.postadId.price * item.quantity
        })


        const { fullName, email, phoneNumber, address, country, city } = req.body
        const transactionData = {
            fullName,
            email: currentUser.email,
            phoneNumber,
            address,
            country,
            city,
            userId: currentUser._id,
            currency: "NGN",
            amount: totalAmount * 100,
            callback_url: "http://localhost:5005/callback"
        }

        const paymentResponse = await initializePayment(transactionData)
        const { authorization_url } = paymentResponse.data
        res.redirect(authorization_url)
    } catch (error) {
        console.error(error.message)
        res.render("checkout", {
            error: error.message
        })
    }
}


const callBack = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect("/login")
        }
        const userId = req.user.id
        const currentUser = await userModel.findOne({ _id: userId })
        const userProduct = await cartModel.find({ userId: userId }).populate("postadId")
        let totalAmount = 0
        userProduct.forEach(item => {
            totalAmount += item.postadId.price * item.quantity
        })
        const { reference, trxref } = req.query
        const paymentStatus = await verifyPaymentStatus(trxref)

        if (paymentStatus.data.status === "success") {
            const products = userProduct.map((item) => ({
                postadId: item.postadId._id,
                quantity: item.quantity
            }))
            await checkoutModel.create({
                userId: userId,
                product: products,
                reference: reference || "",
                trxref: trxref || "",
                status: true,
            })
            await cartModel.deleteMany({ userId: userId })
            res.render("checkout", {
                message: "Payment successful",
                success: true,
                currentUser
            })
        } else {
            await checkoutModel.create({
                userId: userId,
                product: products,
                reference: reference || "",
                trxref: trxref || "",
                status: false,
            })
            res.render("checkout", {
                message: "Payment failed",

                currentUser,
                userProduct,
                totalAmount
            })
        }

    } catch (error) {
        console.error(error.message)
        res.render("checkout", {
            message: "An error occurred while processing the payment",
            currentUser: req.user ? await userModel.findOne({ _id: req.user_id }) : null,
            userProduct: [],
            totalAmount: 0,
            error: error.message,
        })
    }
}

module.exports = { payment, callBack }