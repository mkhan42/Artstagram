const express = require("express");
const Post = require("../models/posts");

const router = express.Router();

router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

// const multer = require("multer")
// const cloudinary = require("cloudinary")
// const { CloudinaryStorage } = require("multer-storage-cloudinary")

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
//     })
//     const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "demo",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
//     })
//     const parser = multer({ storage: storage })

router.get("/", (req, res) => {
  Post.find({ username: req.session.username })

    .then((posts) => {
      //console.log(req.session);
      res.render("posts/index.liquid", { posts });
      // posts.owner.push(req.session.username)
    })

    .catch((error) => {
      res.json({ error });
    });
});

router.get("/feed", (req, res) => {
  Post.find({})

    .then((posts) => {
      res.render("posts/feed.liquid", { posts });
    })

    .catch((error) => {
      res.json({ error });
    });
});

// router.get("/feed/:id", (req, res) => {
//   const id = req.params.id;
//   Post.findById(id)
//     .then((post) => {
//       res.render("posts/showfeed.liquid", { post });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });

router.get("/new", (req, res) => {
  res.render("posts/new.liquid");
});

router.get("/addNew", (req, res) => {
  res.render("posts/addNew.liquid");
});

router.post("/", (req, res) => {
  //console.log(req.file)
  //const image = {};
  //image_url = req.file.url;
  //image_id = req.file.public_id;
  req.body.username = req.session.username;
  Post.create(req.body)
    //.then(newImage => res.json(newImage))
    .then((posts) => {
      posts.owner = req.session.username;
      console.log(posts);
      res.redirect("/posts");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post.username == req.session.username) {
        res.render("posts/edit.liquid", { post });
      } else {
        res.send("You are not the owner");
      }
    })

    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((post) => {
      res.redirect("/posts");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  console.log('GOODBYEEEEE');
  Post.findByIdAndRemove(req.params.id)
    .then((post) => {
      res.redirect("/posts");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // if (post.username == req.session.username) {
        res.render("posts/show.liquid", { post, username: req.session.username });
      // } else {
      //   res.render("posts/showfeed.liquid", { post, username: req.session.username });
      // }
      // res.render("posts/show.liquid", { post, user});
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

module.exports = router;
