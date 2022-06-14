const mongoose = require("./connection")
const User = require("./user")

const { Schema, model } = mongoose

// const imageSchema = new Schema ({
//     url: String,
//     id: String,
// })


const commentsSchema = new Schema ({
    content: String
}, {
    timestamps: true
})

const postsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    image_url: String,
    //image_id: String,
    title: {
        type: String,
        default: 'Untitled',
        required: true
    },
    description: String,
    tools_used: [String],
    username: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [commentsSchema]
}, {
    timestamps: true
},

    //userId
)

const Post = model('Post', postsSchema)

module.exports = Post