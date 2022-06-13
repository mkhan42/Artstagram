require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const path = require("path")
const Art = require("./models/arts")
const ArtRouter = require('./controllers/arts')


const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
})

app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.static("public"))

app.use('/arts', ArtRouter)

app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))