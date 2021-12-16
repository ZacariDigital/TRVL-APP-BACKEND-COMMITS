const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')

router.get('/', (req, res)=>{
    res.send("hello")
})

router.post('/signup', (req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
        return res.status(420).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(420).json({error:"User already exist with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
            .then(user=>{
                res.json({message:"User saved succesfully"})
            })
            .catch(err=>{
                console.log(err)
            })

        })

    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router