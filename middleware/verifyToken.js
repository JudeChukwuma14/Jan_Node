const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    const token = req.cookies.NexusPlus
    const viewUser = jwt.decode(token, process.env.JWT_SECRET)
    req.user = viewUser
    next()
}

module.exports = verifyToken