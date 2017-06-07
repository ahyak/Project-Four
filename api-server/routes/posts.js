const
  express = require('express'),
  Post = require('../models/Post.js'),
  postsRouter = new express.Router(),
  authorize = require('../config/serverAuth.js').authorize


postsRouter.use(authorize)

postsRouter.route('/')
  .get((req,res) => {
    Post.find({user: req.decoded._id}, (err,posts) => {
      res.json(posts)
    })
  })
  .post((req,res) =>{
    const newPost = new Post(req.body)
    newPost.user = req.decoded._id
    newPost.save((err,post) =>{
      res.json({sucess:true, message: "Post created.", post})
    })
  })

  postsRouter.route('/:id')
    .patch((req,res) => {
      Post.findById(req.params.id, (err, post) =>{
        post.completed = !post.completed
        post.save((err,post) =>{
          res.json({sucess:true, message: "Post updated.", post})
        })
      })
    })
    .delete((req, res) => {
      Post.findByIdAndRemove(req.params.id, (err, post) => {
        res.json({success: true, message: "Post deleted.", post})
      })
    })

module.exports = postsRouter
