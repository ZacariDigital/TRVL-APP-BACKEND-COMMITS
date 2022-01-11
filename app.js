const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGURI} = require('./keys')


mongoose.connect(MONGURI)
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error', (err)=>{
    console.log("error connection", err)
})


require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(PORT,()=>{
    console.log("server is active", PORT)
})