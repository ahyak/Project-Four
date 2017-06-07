const
  mongoose = require('mongoose'),

  commentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: String
  }),
  postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    image: String,
    body: String,
    comments: [commentSchema]
  }, {timestamps: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
