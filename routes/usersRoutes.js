const express=require('express');
const router=express.Router();
const UserController = require('../controller/userController')
const passport = require('passport');
const { redirect } = require('express/lib/response');
const isAutenticated =require('../middleware/isAuthenticated')

router.get('/login',(req,res)=>{
    const error=req.flash('error')
    if(error){
        res.render('users/login',{error})
    }
})

router.post('/login',
        passport.authenticate('login.strategy',{
            successRedirect:'/users/profile',
            failureRedirect:'/users/login',
            failureMessage:true,
            successMessage:true
        })
)

router.get('/register',(req,res)=>{
                const error=req.flash('error')
                if(error){
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
    req.logout();
    res.redirect('/users/login')
})

router.get('/profile',isAuthenticated,(req,res)=>{
    res.render('users/profile')
})

module.exports=router