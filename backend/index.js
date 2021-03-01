const express = require('express')
const data = require('./data')

const app = express()

app.get('/api/products',(req,res)=>{
    res.send(data)
})

module.exports = app