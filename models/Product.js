const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    productPic: {
        type: String,
        default: "",
    },
    userid: {
        type: String,
        required: true,
    },
    brands: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    }
},
{timestamps: true})

module.exports = mongoose.model("Product", ProductSchema)