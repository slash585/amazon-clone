const express = require('express')
const cors = require('cors')

const app = express()

const { mongoose } = require('./bootstrap')

const accountRouter = require('./routes/account')
const productRouter = require('./routes/product')

app.use(cors())

app.use('/api/users', accountRouter)
app.use('/api/products', productRouter)

app.use((err,req,res,next)=>{
    res.status(500).send({ message: err.message })
})

module.exports = app