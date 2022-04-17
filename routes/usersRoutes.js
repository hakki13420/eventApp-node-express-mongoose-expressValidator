const express=require('express');
const router=express.Router();
const UserController = require('../controller/userController')
const passport = require('passport');
const { redirect } = require('express/lib/response');
const isAutenticated =require('../middleware/isAuthenticated')
const multer=require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/images')
    },
    filename: function (req, file, cb) {
      const ext=file.originalname.split('.')[1]
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+"."+ext
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

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


router.post('/profile/upload',isAutenticated,upload.single('avatar') ,(req,res)=>{
    UserController.addAvatar(req,res);
    //console.log('avatar name',req.file.filename)
})

module.exports=router