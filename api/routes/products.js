const router = require("express").Router()

const Brand = require("../models/Brand.js")
const Product = require("../models/Product.js")
const verify = require("../middle/verify.js")

// CREATE PRODUCT
router.post("/", verify, async (req, res) => {
    let addId = req.body
    addId.userid = req.user.userId
    const newProduct = await Product(addId)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPFATE PRODUCT
router.put("/:id", verify, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product.userid === req.user.userId) {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(
                    req.params.id, 
                    {
                        $set: req.body,
                    }, 
                    {new: true}
                )
                res.status(200).json(updatedProduct)
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json({"Message": "You can update only your Product!"})
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE PRODUCT
router.delete("/:id", verify, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product.userid === req.user.userId) {
            try {
                await product.delete()
                res.status(200).json({"Message": "Product has been deleted..."})
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json({"Message": "You can delete only your product!"})
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET PRODUCT
router.get("/:id", verify, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL PRODUCT
router.get("/", verify, async (req, res) => {
    const catName = req.query.cat
    const brandName = req.query.brand
    try {
        let products = await Product.find({userid: req.user.userId})
        if (brandName) {
            let brandId = await Brand.findOne({name: brandName})
            products = await Product.find({brands: brandId._id.toString()})
        } else if (catName) {
            products = await Product.find({categories: {
                $in: [catName]
            }})
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router