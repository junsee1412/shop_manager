const mongoose = require("mongoose")

const BillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    checkout: {
        type: Boolean,
        required: true,
        default: false,
    },
    products: {
        type: Array,
        required: true,
    }
},
{timestamps: true})

module.exports = mongoose.model("Bill", BillSchema)