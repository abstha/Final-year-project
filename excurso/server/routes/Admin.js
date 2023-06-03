const router = require("express").Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.post('/adminlogin', async(req,res) => {


    try{
        const user  = await User.findOne({userName : req.body.userName})
        if(user && user.isAdmin){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword){
                console.log(`\x1b[41m%s\x1b[0m`,"failed logging in to admin");
                res.status(400).json("Wrong username or password")
            } 
            else {
               
                console.log(`\x1b[42m%s\x1b[0m`,"success loggin in to admin");
                console.log(`\x1b[42m%s\x1b[0m`,"successful logging in to admin")
                res.status(200).json("successfully logged in to admin")
            }
        }
        else{
            console.log(`\x1b[41m%s\x1b[0m`,"failed logging in to admin");
             res.status(400).json("Wrong username or password")
        }
    }
    catch(err){
        console.log(`\x1b[41m%s\x1b[0m`,"failed logging in admin");
        res.status(500).json(err)
    }
})

module.exports = router