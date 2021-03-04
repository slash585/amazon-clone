const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/product')
const data = require('../data')

const router = require('express').Router()

router.get('/', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({})
    res.send( products )
}))

router.get('/seed', expressAsyncHandler(async(req,res)=>{
    console.log('ok')
    await Product.deleteMany({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({ createdProducts })
}))

router.get('/:id',expressAsyncHandler(async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.send(product)
    }catch(e){
        next(e)
    }
}))

module.exports = router