const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: {type: String, select: false}
  })

// this function will take the password string and encrypt it with bcrypt.
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// this function will take the password and compare it to the encrypted version.
userSchema.methods.validPassword = function(password){
  if(!password) return false
	return bcrypt.compareSync(password, this.password)
}

// before saving a user, check if password was modified and encrypt it.
userSchema.pre('save', function(next) {
  const user = this
  if(!user.isModified('password')) return next()
  user.password = user.generateHash(user.password)
  next()
})

module.exports = mongoose.model('User', userSchema)
