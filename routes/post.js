const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requiredLogin = require('../middleware/requireLogin')

router.post('/createpost', requiredLogin, (req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        return res,status(422).json({error:"please add all the fields"})
    }
    
    const post = new this.post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })

})

module.exports = router