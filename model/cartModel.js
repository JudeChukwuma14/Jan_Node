const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    postadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostAd"
    },
    quantity: {
        type: Number,
        default: 1 // Ensure quantity is defined
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Cart", cartSchema);