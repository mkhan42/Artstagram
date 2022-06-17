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

router.get("/", (req, res) => {
  Post.find({ username: req.session.username })

    .then((posts) => {
      res.render("posts/index.liquid", { posts });
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

router.get("/new", (req, res) => {
  res.render("posts/new.liquid");
});

router.get("/addNew", (req, res) => {
  res.render("posts/addNew.liquid");
});

router.post("/", (req, res) => {
  req.body.username = req.session.username;
  Post.create(req.body)
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
  console.log("GOODBYEEEEE");
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
      res.render("posts/show.liquid", { post, username: req.session.username });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

module.exports = router;
