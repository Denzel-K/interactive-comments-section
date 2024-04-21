const mongoose = require("mongoose");

const repliesSchema = new mongoose.Schema({
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
    replyingTo: {
        type: String
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
    repliesToReply: {
        type: String
    }
})

const Reply = mongoose.model ('replies', repliesSchema);

module.exports = Reply;
