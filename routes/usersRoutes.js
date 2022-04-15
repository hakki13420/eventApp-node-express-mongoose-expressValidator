const express=require('express');
const router=express.Router();
const UserController = require('../controller/userController')


router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.post('/login', (req,res)=>{
    res.json('process login form')
})

router.get('/register', UserController.registerUser)

router.post('/register',UserController.addUser)

router.get('/logout',(req,res)=>{
    res.json('process logout')
})

router.get('/profile',(req,res)=>{
    res.render('users/profil')
})

module.exports=router