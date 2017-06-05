const
  jwt = require('jsonwebtoken'),
  jwtSecret = process.env.JWT_SECRET

const serverAuth = {
  // create a token using the jwtSecret and set a custom expiration date.
  createToken: function(data) {
    return jwt.sign(data, jwtSecret, {expiresIn: '7 days'})
  },

  // verify the authenticity of the token using the jwtSecret
  verifyToken: function(token) {
    return jwt.verify(token, jwtSecret)
  },

  // protect routes from being accessed unless request contains a valid token
  authorize: function(req, res, next) {
    const token = req.body.token || req.query.token ||
    req.headers['x-access-token']
    if(!token) return res.status(403).json({success: false, message:
      "Token is either invalid or not present."})

    const decoded = serverAuth.verifyToken(token)
    if(decoded) req.decoded = decoded
    next()
  }
}

module.exports = serverAuth
