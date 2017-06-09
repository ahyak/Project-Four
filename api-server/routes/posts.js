const
  express = require('express'),
  postsRouter = new express.Router(),
  Post = require('../models/Post.js'),
  postsCtrl = require('../controllers/posts.js'),
  commentsCtrl = require('../controllers/comments.js'),
  authorize = require('../config/serverAuth.js').authorize

// showing all posts and sorting them by created At
  postsRouter.route('/all')
    .get((req,res) => {
      Post.find({}).sort('createdAt').exec((err,posts) => {
        res.json(posts)
      })
    })

// all post-related api routes require a valid token to be present:
postsRouter.use(authorize)
// in any of the following routes, the 'current user' can be found in req.decoded...


/////////////////////////////Posts Routers///////////////////////////////////////
postsRouter.route('/')
  .get(postsCtrl.index) //get all posts specific to current user
  .post(postsCtrl.create) //create a new post

postsRouter.route('/:id')
  .patch(postsCtrl.update) //edit an existing post
  .delete(postsCtrl.destroy) // delete a post
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////Comment Routers///////////////////////////////////////
postsRouter.route('/:id/comments')
  .get(commentsCtrl.index) //get all comments specific to a post
  .post(commentsCtrl.create) //creates a new comment specific to a post

postsRouter.route('/:id/comments/:commentId')
  .patch(commentsCtrl.update) //edit an existing comment
  .delete(commentsCtrl.destroy) // delete a comment associated to a post
////////////////////////////////////////////////////////////////////////////////


module.exports = postsRouter
