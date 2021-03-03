const express = require('express')
const data = require('./data')
const cors = require('cors')

const app = express()

const { mongoose } = require('./bootstrap')

const accountRouter = require('./routes/account')

app.use(cors())

app.use('/api/users', accountRouter)

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

app.use((err,req,res,next)=>{
    res.status(500).send({ message: err.message })
})

module.exports = app