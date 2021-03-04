const router = require('express').Router()
const data = require('../data')
const User = require('../models/user')
const { generateToken } = require('../utils')
const bcrypt = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')

router.get('/seed', expressAsyncHandler (async (req,res)=>{
    await User.deleteMany({})
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
}))

router.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user),
          })
          return
        }
      }
      res.status(401).send({ message: 'Invalid email or password' })
    })
  )

module.exports = router