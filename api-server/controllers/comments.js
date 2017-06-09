const
  Comment = require('../models/Post.js'),
  Post = require('../models/Post.js'),
  authorize = require('../config/serverAuth.js').authorize

module.exports = {
  index,
  create,
  update,
  destroy
}

function index(req, res) {
  Post.findById(req.params.id, (err, post) => {
    var comment = post.comment
      console.log(comment)
      res.json(comment)
    })
}

function create(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, post) =>{
    if(err) return console.log(err)
    var newComment = {}
    newComment.body = req.body.body
    console.log(newComment)
    newComment.user = req.decoded._id
    post.comment.push(newComment)
    post.save((err,post) => {
      res.json({sucess:true, message: "Comment created.", post})
    })
  })
}

function update(req,res) {
  Post.findById(req.params.id, (err, post) =>{
    console.log(post)
    if (err) return console.log(err)
    Object.assign(post, req.body)
    post.save((err) =>{
      res.json({success:true, message: "Post updated.", post:post})
    })
  })
}
function destroy(req,res) {
  Post.findById(req.params.id, function(err, post){
    var comment = post.comment.id(req.params.commentId)
    var index = post.comment.indexOf(comment)
    post.comment.splice(index,1)
    post.save()
    res.json({success:true, message: "Comment Deleted."})
  })
}
