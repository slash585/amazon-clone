const express = require('express')
const data = require('./data')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.get('/api/products/:id',(req,res)=>{
    const product = data.products.find(i => i._id == req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

module.exports = app