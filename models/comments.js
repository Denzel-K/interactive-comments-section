const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
    },
    count: {
        type: Number,
    },
    user: {
        image: { 
            png: {type: String},
            webp: {type: String}
        },
        username: {
        type: String,
        }
    },
    replies: {
        type: String
    }
})

const Comment = mongoose.model ('comments', commentSchema);

module.exports = Comment;
