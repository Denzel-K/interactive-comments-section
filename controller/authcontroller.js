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
    const { content, createdAt, count, user } = req.body;
    console.log(req.body);

    try {
        const new_comment = await Comment.create({ content, createdAt, count, user });
        res.status(201).json({new_comment});
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.createReply = async (req, res) => {
    const { content, createdAt, count, user, replyingTo } = req.body;

    try {
        const results = await Reply.create({ content, createdAt, count, user, replyingTo });
        res.status(201).json({results});
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.replyToReply = async (req, res) => {
    const { content, createdAt, count, user, replyingTo } = req.body;

    try {
        const results = await ReplyToReply.create({ content, createdAt, count, user, replyingTo });

        res.status(201).json({results});
    }
    catch (err) {
        console.log(err);
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

module.exports.updateComment = async (req, res) => {
    const { content, createdAt, user } = req.body;
    const id = req.params.id;
    
    try {
        const commentUpdate = await Comment.findByIdAndUpdate(id, {
            content,
            createdAt,
            user
        },
        {useFindAndModify: false});

        console.log(commentUpdate);

        res.status(200).json({commentUpdate});
    }
    catch(err){
        console.log(err)
        res.status(500).send({ message: err.message || "An error occured while updating the comment" });
    }
}

module.exports.updateReply = async (req, res) => {
    const { content, createdAt, count, user, replyingTo } = req.body;
    const id = req.params.id;
    
    try {
        const replyUpdate = await Reply.findByIdAndUpdate(id, {
            content,
            createdAt,
            count,
            user,
            replyingTo
        },
        {useFindAndModify: false});

        console.log(replyUpdate);

        res.status(200).json({replyUpdate});
    }
    catch(err){
        console.log(err)
        res.status(500).send({ message: err.message || "An error occured while updating the reply" });
    }
}

module.exports.updateSubReply = async (req, res) => {
    const { content, createdAt, count, user, replyingTo } = req.body;
    const id = req.params.id;
    
    try {
        const replyUpdate = await ReplyToReply.findByIdAndUpdate(id, {
            content,
            createdAt,
            count,
            user,
            replyingTo
        },
        {useFindAndModify: false});

        console.log(replyUpdate);

        res.status(200).json({replyUpdate});
    }
    catch(err){
        console.log(err)
        res.status(500).send({ message: err.message || "An error occured while updating the reply" });
    }
}

module.exports.commentCount = async (req, res) => {
    const { currentVal } = req.body;
    const id = req.params.id;
    
    try {
        const countUpdate = await Comment.findByIdAndUpdate(id, {
            count: currentVal
        },
        {useFindAndModify: false});

        //console.log(countUpdate);
        res.status(200).json({countUpdate});
    }
    catch(err){
        console.log(err)
        res.status(500).send({ message: err.message || "An error occured while updating the reply" });
    }
}

module.exports.replyCount = async (req, res) => {
    const { currentVal } = req.body;
    const id = req.params.id;
    
    try {
        const countUpdate = await Reply.findByIdAndUpdate(id, {
            count: currentVal
        },
        {useFindAndModify: false});

        //console.log(countUpdate);
        res.status(200).json({countUpdate});
    }
    catch(err){
        console.log(err)
        res.status(500).send({ message: err.message || "An error occured while updating the reply" });
    }
}

module.exports.subreplyCount = async (req, res) => {
    const { currentVal } = req.body;
    const id = req.params.id;
    
    try {
        const countUpdate = await ReplyToReply.findByIdAndUpdate(id, {
            count: currentVal
        },
        {useFindAndModify: false});

        //console.log(countUpdate);
        res.status(200).json({countUpdate});
    }
    catch(err){
        console.log(err)
        res.status(500).send({ message: err.message || "An error occured while updating the reply" });
    }
}