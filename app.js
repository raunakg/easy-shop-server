const express = require("express")
const morgan = require("morgan")
require("dotenv/config")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

app.use(cors())
app.options("*", cors())
//Routes
const categoriesRoutes = require("./routes/categories")
const productsRoutes = require("./routes/products")
const usersRoutes = require("./routes/users")
const ordersRoutes = require("./routes/orders")
const authJwt = require("./helpers/jwt")
const errorHandler = require("./helpers/error-handler")

const api = process.env.API_URL

//Middleware
app.use(express.json())
app.use(morgan("tiny"))
app.use(authJwt())
app.use("/public/uploads", express.static(__dirname + "/public/uploads"))
app.use(errorHandler)

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("DB CONNECTED")
    })
    .catch((err) => {
        console.log(err)
    })

// Development
// app.listen(3000, () => {
//     console.log("Server is running on port 3000")
// })

// Production

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port
    console.log("Express is working on port " + port)
})
