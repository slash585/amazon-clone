const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { mongoose } = require('./bootstrap')

const accountRouter = require('./routes/account')
const productRouter = require('./routes/product')

dotenv.config()

app.use(cors())

app.use('/api/users', accountRouter)
app.use('/api/products', productRouter)

app.use((err,req,res,next)=>{
    res.status(500).send({ message: err.message })
})

module.exports = app