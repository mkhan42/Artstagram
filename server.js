require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const path = require("path")
//const Post = require("./models/posts")
const PostRouter = require('./controllers/posts')
const CommentsRouter = require('./controllers/comments')
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");


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

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUninitialized: true,
    resave: false,
  })
);

app.use('/posts', PostRouter)
app.use('/', CommentsRouter)
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.render("index.liquid");
});

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))