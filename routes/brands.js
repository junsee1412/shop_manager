const router = require("express").Router()

const Brand = require("../models/Brand.js")
const verify = require("../middle/verify.js")

// CREATE BRAND
router.post("/", verify, async (req, res) => {
    let preBrand = req.body
    preBrand.userid = req.user.userId
    const newCat = await Brand(preBrand)
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET BRAND
router.get("/", verify, async (req, res) => {
    try {
        const cats = await Brand.find({userid: req.user.userId})
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router