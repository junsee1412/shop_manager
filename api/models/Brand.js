const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    }
},
{timestamps: true})

module.exports = mongoose.model("Brand", BrandSchema)