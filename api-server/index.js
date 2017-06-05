const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  usersRoutes = require('./routes/users.js'),

  //environment port
  port = process.env.PORT || 3001,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/project-four'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || "Connected to MongoDB")
})

// log incoming requests to console
app.use(logger('dev'))

// allowing ajax requests from other domains (including other localhost ports)
app.use(cors())

// interpret bodies of data that are included in requests:
app.use(bodyParser.urlencoded({extended: true})) //interpret form data
app.use(bodyParser.json()) // interpret json bodies

app.get('/', (req, res) => {
  res.json({message: "Root Route"})
})

app.use('/api/users', usersRoutes)

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}. 🤘`)
})
