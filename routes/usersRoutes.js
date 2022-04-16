const express=require('express');
const router=express.Router();
const UserController = require('../controller/userController')
const passport = require('passport')


router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.post('/login', (req,res)=>{
    res.json('process login form')
})

router.get('/register',(req,res)=>{
                const error=req.flash('error')
                if(error){
                    console.log('error',req.flash('error'))

                    console.log('err',req.flash('error'))
                    
                    res.render('users/register',{error})
                }else UserController.registerUser(req,res)
            }
        )

router.post('/register',
            passport.authenticate('local.register',{
                successRedirect:'/users/profile',
                failureRedirect:'/users/register',
                failureFlash:true
            }),
            UserController.addUser)

router.get('/logout',(req,res)=>{
    res.json('process logout')
})

router.get('/profile',(req,res)=>{
    res.render('users/profile')
})

module.exports=router