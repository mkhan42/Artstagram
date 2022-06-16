const express = require("express");
const Post = require("../models/posts");

const router = express.Router();

router.post("/:id/comments", (req, res) => {
    Post.findById(req.params.id, (error, post) => {
        req.body.username = req.session.username;
        post.comments.push(req.body);
        console.log(post);

        post.save((error) => {
            res.redirect(`/posts/${post._id}`);
        });
    });
});

router.put("/:postId/:commentId", (req, res) => {

    const postId = req.params.postId;
    console.log("postid", postId);
    const commentId = req.params.commentId;
    console.log("comment", commentId);
    Post.findById(postId)
        .then((post) => {
            console.log(post);
            const postComment = post.comments.id(commentId);
            if (String(postComment._id) === String(req.params.commentId)) {
                postComment.content = req.body.content;
                //post.comments.push(req.body);
                return post.save();
            } else {
                return;
            }
        })
        .then((post) => {
            res.redirect(`/posts/${postId}`);
        });
})

router.get("/:id/:commentId/comments/edit", (req, res) => {
    Post.findById(req.params.id).then((post) => {
        res.render("posts/editComment.liquid", {
            post: post,
            commentId: req.params.commentId,
        });
    });
});

//referenced Ivy Le
router.delete("/:postId/:commentId", (req, res) => {
    console.log("HELLOOOOOO");
    const postId = req.body.postId;
    console.log("postid", postId);
    const commentId = req.params.commentId;
    console.log("comment", commentId);
    Post.findById(postId)
        .then((post) => {
            console.log(post);
            const postComment = post.comments.id(commentId);
            if (String(postComment._id) === String(req.params.commentId)) {
                console.log("reached here");
                postComment.remove();
                return post.save();
            } else {
                return;
            }
        })
        .then((post) => {
            res.redirect(`/posts/${postId}`);
        });
});

module.exports = router;