const router = require("express").Router()

const Bill = require("../models/Bill.js")
const Product = require("../models/Product.js")

const verify = require("../middle/verify.js")

// CREATE BILL
router.post("/", verify, async (req, res) => {
    let addId = req.body

    let products = req.body.products
    let newproducts = []
    for (x in products) {
        let product = await Product.findById(products[x]._id)
        
        // let adiv = parseInt(product.amount) - parseInt(products[x].count)
        
        // await Product.findByIdAndUpdate(products[x]._id, {amount: adiv})
        
        let {amount, ...others} = product._doc
        others.count = products[x].count

        newproducts.push(others)
    }

    addId.userid = req.user.userId
    addId.products = newproducts
    const newBill = await Bill(addId)
    try {
        const savedBill = await newBill.save()
        res.status(200).json(savedBill)
    } catch (err) {
        res.status(500).json(err)
    }
})

// CHECK OUT
router.put("/:id", verify, async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id)
        if (bill.userid === req.user.userId) {
            if (bill.checkout) {
                res.status(200).json({"Message": "This Bill has been paid!"})
            } else {
                try {
                    const bill = await Bill.findById(req.params.id)
                    let products = bill.products
                    for (x in products) {
                        let product = await Product.findById(products[x]._id)
                        
                        let adiv = parseInt(product.amount) - parseInt(products[x].count)
                        
                        await Product.findByIdAndUpdate(products[x]._id, {amount: adiv})
                    }

                    const updatedBill = await Bill.findByIdAndUpdate(
                        req.params.id, 
                        {
                            checkout: req.body.checkout,
                        }, 
                        {new: true}
                    )
                    res.status(200).json(updatedBill)
                } catch (err) {
                    res.status(500).json(err)
                }
            }
        } else {
            res.status(401).json({"Message": "You can update only your Bill!"})
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET BILL
router.get("/:id", verify, async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id)
        res.status(200).json(bill)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL BILL
router.get("/", verify, async (req, res) => {
    const checkout = req.query.checkout
    let findObj = {userid: req.user.userId}

    if (checkout === "false")  {
        findObj.checkout = false
    } else if (checkout === "true")  {
        findObj.checkout = true
    }
    try {
        const results = await Bill.find(findObj)
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router