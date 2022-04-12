const router = require("express").Router()

const Bill = require("../models/Bill.js")

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
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await Bill.countDocuments({userid: req.user.userId}).exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
        
        if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
      
    try {
        results.results = await Bill.find({userid: req.user.userId}).limit(limit).skip(startIndex).exec()
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router