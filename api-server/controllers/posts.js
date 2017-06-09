const
  Post = require('../models/Post.js'),
  authorize = require('../config/serverAuth.js').authorize

module.exports = {
  index,
  create,
  update,
  destroy
}

function index(req, res) {
  Post.find({}, '-__v', (err, posts) => {
    res.json(posts)
  })
}


function create(req, res) {
  const newPost = new Post(req.body)
  console.log(req.decoded)
    newPost.user = req.decoded._id
    newPost.save((err,post) =>{
      res.json({sucess:true, message: "Post created.", post})
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
  Post.findByIdAndRemove(req.params.id, (err, post) => {
    res.json({success: true, message: "Post deleted.", post})
  })
}
