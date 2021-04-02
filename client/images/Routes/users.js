const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
//Register handle
router.post('/register',(req,res)=>{
    const {username,password,confirm} = reg.body;
    let errors = [];
    console.log('Username: ' + username + ' Password: ' + password);
    if(!username || !password || !confirm){
        errors.push({msg: "Please fill in all fields"});
    }
    //Checking if the two passwords match
    if (password !== confirm)
    {
        errors.push({msg: "Passwords do not match"});
    }

    //Checking if the password has more than 6 characters
    if(password.length < 6)
    {
        errors.push({msg: "Password must be at least 6 characters"});
    }
    
    if(errors.length > 0)
    {
        res.render('register', {
            errors:errors,
            username:username,
            password:password,
            confirm:confirm
        })
    }
    else
    {
        //Validate username

    }
})
router.post('/login',(req,res,next)=>{
  })

module.exports  = router;