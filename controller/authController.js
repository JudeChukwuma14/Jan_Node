const userAuth = require("../model/authModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const { username, email, password, retypedpassword } = req.body
    const emptyArray = []
    const incomingFields = ["username", "email", "password", "retypedpassword"]
    for (const field of incomingFields) {
        if (!req.body[field] || req.body[field] === "") {
            emptyArray.push(field)

        }
    }
    if (emptyArray.length > 0) {
        return res.render("register", { error: `This field is required: ${emptyArray.join(", ")}` })
    }

    if (password !== retypedpassword) {
        return res.render("register", { error: "Password does not match" })
    }
    const existingUser = await userAuth.findOne({ email: email });
    if (existingUser) {
        return res.render("register", { error: "email already exist" })
    }
    const hashPassword = bcryptjs.hashSync(password, 10)
    await userAuth.create({ email: email, password: hashPassword, username: username })
    res.render("login", { success: "User created successfully" })
}

const loginUser = async (req, res) => { 
    const {emailOrusername, password }=req.body
    const emptyArray = []
    const incomingFields = ["emailOrusername", "password"]
    for (const field of incomingFields) {
        if (!req.body[field] || req.body[field] === "") {
            emptyArray.push(field)

        }
    }
    if (emptyArray.length > 0) {
        return res.render("register", { error: `This field is required: ${emptyArray.join(", ")}` })
    }
    const existingUser = await userAuth.findOne({ $or: [{ email: emailOrusername }, { username: emailOrusername }] });
    if (!existingUser) {
        return res.render("login", { error: "Email/Username and Password Mismatch" })
    }
    const checkPassword = bcryptjs.compareSync(password, existingUser.password)
    if (!checkPassword) {
        return res.render("login", { error: "Wrong Credentials" })
    }
    const token = await jwt.sign({id:existingUser._id}, process.env.JWT_SECRET)
    res.cookie("NexusPlus", token,{maxAge: 3600000, httpOnly: true})
    res.redirect("/")
}

const Logout =(req, res)=>{
try {
    if(req.user){
        res.clearCookie("NexusPlus")
        res.redirect("/login")
    }else{
        res.redirect("/login")
    }
} catch (error) {
 console.log(error.message)   
}
}

module.exports = { createUser, loginUser, Logout }