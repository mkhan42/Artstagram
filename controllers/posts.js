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

router.post("/:id/comments", (req, res) => {
  Post.findById(req.params.id, (error, post) => {
    req.body.username = req.session.username;
    post.comments.push(req.body);
    console.log(post);

    post.save((error) => {
      res.redirect(`/posts/${post._id}`);
    });
  });
});

router.put("/:id/:commentId/comments", (req, res) => {
  //Post.findByIdAndUpdate(req.params.id, req.body,
  // (error, post) => {
  //   post.comments.push(req.body);
  //   console.log(post);
  //   post.save((error) => {
  //     res.redirect(`/posts/${post._id}`);
  //   });

  //});

  // Post.findById(req.params.id).populate('comments').exec((err, commentList) => {
  //   for(let i = 0; i < commentList.comments.length; i++) {
  //     if(commentList.comments[i]._id === req.params.commentId) {
  //       commentList.comments[i].content = req.body.content
  //       break
  //     }
  //   }
  //   console.log(commentList.comments[0].content);
  //   res.redirect(`/posts/${req.params.id}`);
  // })

  Post.findByIdAndUpdate(req.params.id, req.body, (error, post) => {
    Post.populate('comments').exec((err, commentList) => {
      console.log(commentList);
    })
    res.redirect(`/posts/${req.params.id}`);
  });
});

router.get("/:id/:commentId/comments/edit", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render("posts/editComment.liquid", {
      post: post,
      commentId: req.params.commentId,
    });
  });
});

router.delete("/:id/:commentId", (req, res) => {
  Post.findByIdAndRemove(req.params.commentId)
    .then((post) => {
      res.redirect(`/posts/${req.params.id}`);
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
      if (post.username == req.session.username) {
        res.render("posts/show.liquid", { post });
      } else {
        res.render("posts/showfeed.liquid", { post });
      }
      // res.render("posts/show.liquid", { post, user});
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

module.exports = router;
