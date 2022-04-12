const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User.js")

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        const user = await newUser.save()
        let {password, ...others} = user._doc
        // const acsessToken = jwt.sign({userId: others._id}, "Jun147Key", {expiresIn: "15m"})
        const acsessToken = jwt.sign({userId: others._id}, "Jun147Key")
        others.acsessToken = acsessToken
        res.status(200).json(others)

    } catch (err) {
        res.status(500).json(err)
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            res.status(400).json({"Message": "Wrong credentials!"})
        } else {
            const validate = await bcrypt.compare(req.body.password, user.password)
            if (!validate) {
                res.status(400).json({"Message": "Wrong credentials!"})
            } else {
                let {password, ...others} = user._doc
                // const acsessToken = jwt.sign({userId: others._id}, "Jun147Key", {expiresIn: "15m"})
                const acsessToken = jwt.sign({userId: others._id}, "Jun147Key")
                others.acsessToken = acsessToken
                res.status(200).json(others)
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router