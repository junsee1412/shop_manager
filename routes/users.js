const router = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/User.js")
const Product = require("../models/Product.js")
const Category = require("../models/Category.js")
const Brand = require("../models/Brand.js")
const Bill = require("../models/Bill.js")
const verify = require("../middle/verify.js")

// UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.userId === req.params.id){
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
                $set: req.body,
            },
            {
                new: true,
            })
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json({"Message": "You can update only your account"})
    }
    
})

// DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id)
            try {
                await Product.deleteMany({userid: user._id.toString()})
                await Category.deleteMany({userid: user._id.toString()})
                await Brand.deleteMany({userid: user._id.toString()})
                await Bill.deleteMany({userid: user._id.toString()})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({"Message": "User has been deleted..."})
            } catch (err) {
                res.status(500).json(err)
            }
        } catch (err) {
            res.status(404).json({"Message": "User not found!"})
        }
        
    } else {
        res.status(403).json({"Message": "You are not allowed to delete this user!"})
    }
})

// GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router