const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler')
const Order = require('../models/order')
const { isAuth } = require('../utils')

router.post('/', isAuth, expressAsyncHandler(async(req,res)=>{
    if(req.body.orderItems.length == 0) {
        res.status(400).send({ message: 'Cart is empty' })
    }else {
        const order = new Order({
            seller: req.body.orderItems[0].seller,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })

        const createdOrder = await order.save()
        res.status(201).send({ message: 'New order created', order: createdOrder })
    }
}))

module.exports = router