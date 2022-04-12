const router = require("express").Router()

const Category = require("../models/Category.js")
const verify = require("../middle/verify.js")

// CREATE CATEGORY
router.post("/", verify, async (req, res) => {
    let preCat = req.body
    preCat.userid = req.user.userId
    const newCat = await Category(preCat)
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET CATEGORY
router.get("/", verify, async (req, res) => {
    try {
        const cats = await Category.find({userid: req.user.userId})
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router