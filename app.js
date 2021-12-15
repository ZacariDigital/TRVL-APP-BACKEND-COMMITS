const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGURI} = require('./keys')

require('./models/user')

app.use(require('./routes/auth'))

mongoose.connect(MONGURI)
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error', (err)=>{
    console.log("error connection", err)
})



app.listen(PORT,()=>{
    console.log("server is active", PORT)
})