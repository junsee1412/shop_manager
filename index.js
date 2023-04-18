const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const port = 3000

// Router
const authRoute = require("./api/routes/auth.js")
const userRoute = require("./api/routes/users.js")
const productRoute = require("./api/routes/products.js")
const brandRoute = require("./api/routes/brands.js")
const categoryRoute = require("./api/routes/categories.js")
const billtRoute = require("./api/routes/bills.js")

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL_ONL)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/brand", brandRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/bill", billtRoute)

app.listen(process.env.PORT || port, () => {
    console.log("Running...!")
})