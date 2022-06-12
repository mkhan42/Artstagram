const mongoose = require("./connection")

const { Schema, model } = mongoose

const artsSchema = new Schema ({
    artistName: {
        type: String,
        required: true
    },
    artwork: {
        type: String,
        required: true
    },
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