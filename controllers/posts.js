const express = require('express')
const Post = require("../models/posts")


const router = express.Router()

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


router.get('/', (req, res) => {
    Post.find({})
    
    .then((posts) => {
        res.render('posts/index.liquid', { posts })
    })

    .catch((error) => {
        res.json({error})
    })
})

router.get('/new', (req, res) => {
    res.render('posts/new.liquid')
})

router.post('/', (req, res) => {
    //console.log(req.file)
    //const image = {};
    //image_url = req.file.url;
    //image_id = req.file.public_id;
    Post.create(req.body)
      //.then(newImage => res.json(newImage))
      .then((posts) => {
          res.redirect('/posts')
      })
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
  })

  router.post('/:id/comments', (req, res) => {

    Post.findById((req.params.id), (error, post) => {
        post.comments.push(req.body)

        post.save(error => {
            res.redirect(`/posts/${post._id}`)
        })
    })
  })

  router.get('/:id/:commentId/comments/edit', (req, res) => {
      Post.findById((req.params.id))
      .then((post) => {

        res.render('posts/editComment.liquid', {
            post: post,
            commentId: req.params.commentId
        })
      })
  })

//   router.get('/:id/comments/:commentId/edit', (req, res) => {

//   })

//   router.put('/:id/comments', (req, res) => {
//       Post.findByIdAndUpdate((req.params.id, req.body, { new: true }))
//       .then((post) => {

//       })
//           post.comments.push(req.body)
//           post.save(error => {
//             res.redirect(`/posts/${post._id}`)
//         })
//       })
//   })


router.get('/:id/edit', (req, res) => {
    const id = req.params.id

    Post.findById(id)
    .then((post) => {
        res.render('posts/edit.liquid', { post })
    })

    .catch((error) => {
        console.log(error)
        res.json( { error } )
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    Post.findByIdAndUpdate(id, req.body, { new: true })
    .then((post) => {
        res.redirect('/posts')
    })
    .catch((error) => {
        console.log(error)
        res.json( { error } )
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Post.findByIdAndRemove(id)
    .then((post) => {
        res.redirect('/posts')
    })
    .catch((error) => {
        console.log(error)
        res.json( { error } )
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Post.findById(id)
    .then((post) => {
        res.render('posts/show.liquid', { post })
    })
    .catch((error) => {
        console.log(error)
        res.json( { error } )
    })
})

module.exports = router
