const router = require('express').Router()
const data = require('../data')
const User = require('../models/user')
const expressAsyncHandler = require('express-async-handler')

router.get('/seed', expressAsyncHandler (async (req,res)=>{
    await User.deleteMany({})
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
}))

module.exports = router