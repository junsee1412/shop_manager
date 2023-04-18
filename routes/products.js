const router = require("express").Router()

const Brand = require("../models/Brand.js")
const Category = require("../models/Category.js")
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
    const catId = req.query.cat
    const brandId = req.query.brand
    try {
        let products = {userid: req.user.userId}
        if (brandId) {
            products.brands = brandId
        }
        if (catId) {
            products.categories = [catId]
        }
        const results = await Product.find(products).exec()

        res.status(200).json(results)

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router