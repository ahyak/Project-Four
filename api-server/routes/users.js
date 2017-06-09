const
  express = require('express'),
  usersRouter = new express.Router(),
  usersCtrl = require('../controllers/users.js'),
  User = require('../models/User.js'),
  Post = require('../models/Post.js'),
  serverAuth = require('../config/serverAuth.js')

// find by valid email and password. create token with userdata (-p) in payload
  usersRouter.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, '+password',(err, user) => {  
      if(!user || !user.validPassword(req.body.password)) {
        return res.status(403).json({message: "invalid credentials"})
      }
      if(user && user.validPassword(req.body.password)) {
        const userData = user.toObject()
        delete userData.password

        const token = serverAuth.createToken(userData)
        res.json({token: token})
      }
    })
  })
// show all users
  usersRouter.get('/all', (req, res) => {
    User.find({}).exec((err,users) =>{
        if(err) return console.log(err)
        res.json({users:users})
      })
    })


// show all posts associated to a specific user
  usersRouter.get('/all/posts', (req, res) => {
    User.findById(req.params.id, (err, user) => {
      Post.find({}).populate('user post').exec((err,posts) =>{
        if(err) return console.log(err)
        res.json({posts:posts})
      })
    })
  })

  usersRouter.route('/')
    .get(usersCtrl.index)
    .post(usersCtrl.create)


  // token must be provided to access the routes declared after this
  usersRouter.use(serverAuth.authorize)

  usersRouter.route('/:id')
    .get(usersCtrl.show)
    .patch(usersCtrl.update)
    .delete(usersCtrl.destroy)

module.exports = usersRouter
