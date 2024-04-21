const mongoose = require("mongoose");

const replyToReplySchema = new mongoose.Schema({
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
    }
})

const ReplyToReply = mongoose.model ('replyToReply', replyToReplySchema);

module.exports = ReplyToReply;
