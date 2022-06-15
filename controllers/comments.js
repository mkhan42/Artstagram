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

router.put("/:id/:commentId/comments", (req, res) => {
    // Post.findByIdAndUpdate(req.params.id, req.body,
    // (error, post) => {
    //   post.comments.push(req.body);
    //   console.log(post);
    //   post.save((error) => {
    //     res.redirect(`/posts/${post._id}`);
    //   });

    // });

    // Post.findByIdAndUpdate(req.params.id, req.body,
    //   (error, post) => {
    //     const commentId = req.params.commentId
    //     post.comments.findOneAndDelete({ _id: commentId})
    //     post.comments.push(req.body);
    //     console.log(post);
    //     post.save((error) => {
    //       res.redirect(`/posts/${post._id}`);
    //     });

    //   });

    Post.findByIdAndUpdate(req.params.id, req.body,
        (error, post) => {
            post.comments.push(req.body);
            console.log(post);
            post.save((error) => {
                res.redirect(`/posts/${post._id}`);
            });

        });

    // Post.findById(req.params.id).populate('comments').exec((err, commentList) => {
    //   for(let i = 0; i < commentList.comments.length; i++) {
    //     if(commentList.comments[i]._id === req.params.commentId) {
    //       commentList.comments[i].content = req.body.content
    //       break
    //     }
    //   }
    //   console.log(commentList.comments[0].content);
    //   res.redirect(`/posts/${req.params.id}`);
    // })

    // Post.findByIdAndUpdate(req.params.id, req.body, (error, post) => {
    //   Post.populate('comments').exec((err, commentList) => {
    //     console.log(commentList);
    //   })
    //   res.redirect(`/posts/${req.params.id}`);
    // });
});

router.get("/:id/:commentId/comments/edit", (req, res) => {
    Post.findById(req.params.id).then((post) => {
        res.render("posts/editComment.liquid", {
            post: post,
            commentId: req.params.commentId,
        });
    });
});

// .update({
//   "post_id": ObjectId("605a62eadefa2a09797f1ae3")
// },
// {
//   "$pull": {
//     "comment": {
//       "_id": ObjectId("605a62f9defa2a09797f1ae5")
//     }
//   }
// })

router.delete("/:postId/:commentId", (req, res) => {
    console.log('HELLOOOOOO');
    const postId = req.body.postId
    console.log('postid', postId);
    const commentId = req.params.commentId
    console.log('comment', commentId);
    Post.findById(postId)
      // .then((post) => {
      //   res.redirect(`/posts/${req.params.id}`);
      // })
      .then(post => {
        console.log(post);
        const postComment = post.comments.id(commentId)
        if(String(postComment._id) === String(req.params.commentId)) {
            console.log('reached here')
            postComment.remove()
            return post.save()
        }
        else {
            return
        }
        //req.body.username = req.session.username;
        //const thisComment = post.comments._id
        //console.log('this comment', );
        //console.log('post comment', postComment);
        //postComment.remove({})
        //post.findOneAndDelete({_id : commentId})
       //return post.save()
      })
      .then(post => {
            res.redirect(`/posts/${postId}`);
      })

    // Post.updateOne({
    //     "_id": ObjectId(postId)
    // },
    //     {
    //         "$pull": {
    //             "comments": {
    //                 "_id": ObjectId(commentId)
    //             }
    //         }
    //     }
    // )
    //     .then(post => {
    //         res.redirect(`/posts/${req.params.id}`);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         res.json({ error });
    //     });
});

module.exports = router;