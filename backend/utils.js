const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      },
      process.env.JWT_SECRET || 'marlborotouchblue',
      {
        expiresIn: '30d',
      }
    )
  }

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if(authorization){
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, process.env.JWT_SECRET || 'marlborotouchblue', (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'No token' })
  }
}

module.exports = { generateToken, isAuth }
