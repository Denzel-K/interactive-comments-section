const Comment = require ('../models/comments');
const Reply = require ('../models/replies');
const ReplyToReply = require ('../models/replyToReply');
const axios = require('axios');

module.exports.home = async (_req, res) => {
    try {
        const comments = await Comment.find();
        const usr_replies = await Reply.find();
    
        const populatedReplies = await Promise.all(
            usr_replies.map(async (reply) => {
                const populatedReply = reply.toJSON();
                populatedReply.repliesToReply = await ReplyToReply.find({ replyingTo: reply.user.username });
                return populatedReply;
            })
        );
    
        const populatedComments = await Promise.all(
            comments.map(async (comment) => {
                const populatedComment = comment.toJSON();
                populatedComment.replies = await Reply.find({ replyingTo: comment.user.username });
                return populatedComment;
            })
        );
    
        // Merge populatedComments and populatedReplies
        const mergedData = populatedComments.map(comment => {
            const correspondingReplies = populatedReplies.filter(reply => reply.replyingTo === comment.user.username);
            return {
                ...comment,
                replies: [...correspondingReplies]
            };
        });
        
        res.render("index", { comments: mergedData });
    }
    catch (err) {
        console.log(err);
    }
    
}

module.exports.createComment = async (req, res) => {
    const { content, createdAt, score, user } = req.body;
    console.log(req.body);

    try {
        const new_comment = await Comment.create({ content, createdAt, score, user });
        res.status(201).json({new_comment});
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.createReply = async (req, res) => {
    const { content, createdAt, score, user, replyingTo } = req.body;
    console.log(req.body);

    try {
        const reply = await Reply.create({ content, createdAt, score, user, replyingTo });
        res.status(201).json({reply});
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.replyToReply = async (req, res) => {
    const { content, createdAt, score, user, replyingTo } = req.body;
    console.log(req.body);

    try {
        const repliesToReply = await ReplyToReply.create({ content, createdAt, score, user, replyingTo });
        res.status(201).json({repliesToReply});
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.deleteComment = async (req, res) => {
    const id = req.params.id;

    await Comment.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
        res.status(404).send({ message: "Cannot delete this comment." });
        } else {
        res.status(200).send({ message: "Comment deleted successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "An error occured while deleting the comment" });
    })
}

module.exports.deleteReply = async (req, res) => {
    const id = req.params.id;

    await Reply.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
        res.status(404).send({ message: "Cannot delete this reply." });
        } else {
        res.status(200).send({ message: "reply deleted successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "An error occured while deleting the reply" });
    })
}

module.exports.deleteSubReply = async (req, res) => {
    const id = req.params.id;

    await ReplyToReply.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
        res.status(404).send({ message: "Cannot delete this reply." });
        } else {
        res.status(200).send({ message: "reply deleted successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "An error occured while deleting the reply" });
    })
}