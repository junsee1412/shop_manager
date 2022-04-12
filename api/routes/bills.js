const router = require("express").Router()

const Bill = require("../models/Bill.js")
const Product = require("../models/Product.js")
const verify = require("../middle/verify.js")

// CREATE BILL
router.post("/", verify, async (req, res) => {
    let addId = req.body
    addId.userid = req.user.userId
    const newBill = await Bill(addId)
    try {
        const savedBill = await newBill.save()
        res.status(200).json(savedBill)
    } catch (err) {
        res.status(500).json(err)
    }
})


// DELETE BILL
// router.delete("/:id", verify, async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         if (product.userid === req.user.userId) {
//             try {
//                 await post.delete()
//                 res.status(200).json({"Message": "Product has been deleted..."})
//             } catch (err) {
//                 res.status(500).json(err)
//             }
//         } else {
//             res.status(401).json({"Message": "You can delete only your product!"})
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

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
    try {
        let bills = await Bill.find({userid: req.user.userId})
        res.status(200).json(bills)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router