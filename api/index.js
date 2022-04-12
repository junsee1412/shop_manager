const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const port = 3000

// Router
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")
const productRoute = require("./routes/products.js")
const brandRoute = require("./routes/brands.js")
const categoryRoute = require("./routes/categories.js")
const billtRoute = require("./routes/bills.js")

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/brand", brandRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/bill", billtRoute)

app.listen(port, () => {
    console.log("http://127.0.0.1:%d", port)
})