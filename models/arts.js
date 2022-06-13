const mongoose = require("./connection")

const { Schema, model } = mongoose

// const imageSchema = new Schema ({
//     url: String,
//     id: String,
// })

const artsSchema = new Schema ({
    artistName: {
        type: String,
        //required: true
    },
    image: String,
    image_id: String,
    title: {
        type: String,
        default: 'Untitled'
    },
    description: String,
    tools_used: [String]
    //userId
})

const Art = model('Art', artsSchema)

module.exports = Art