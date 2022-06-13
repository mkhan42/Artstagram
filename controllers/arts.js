const express = require('express')
const Art = require("../models/arts")

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
    Art.find({})
    
    .then((arts) => {
        res.render('arts/index.liquid', { arts })
    })

    .catch((error) => {
        res.json({error})
    })
})

router.get('/new', (req, res) => {
    res.render('arts/new.liquid')
})

router.post('/', (req, res) => {
    //console.log(req.file)
    //const image = {};
    //image_url = req.file.url;
    //image_id = req.file.public_id;
    Art.create(req.body)
      //.then(newImage => res.json(newImage))
      .then((arts) => {
          res.redirect('/arts')
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      })
  });

router.get('/:id/edit', (req, res) => {
    const id = req.params.id

    Art.findById(id)
    .then((art) => {
        res.render('arts/edit.liquid', { art })
    })

    .catch((error) => {
        console.log(error)
        res.json( { error } )
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Art.findByIdAndRemove(id)
    .then((art) => {
        res.redirect('/arts')
    })
    .catch((error) => {
        console.log(error)
        res.json( { error } )
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Art.findById(id)
    .then((art) => {
        res.render('arts/show.liquid', { art })
    })
    .catch((error) => {
        console.log(error)
        res.json( { error } )
    })
})

module.exports = router;
