const User=require('../models/User');

class UserController{

    static registerUser(req,res){
        res.render('users/register');
    }

    static addUser(req,res){
        const newUser=new User(
            {
                email:req.body.email,
                password:req.body.password,                
            }
        )
        newUser.save()
            .then(()=>res.redirect('/users/login'))
            .catch(err=>console.log(err))
    }
}

module.exports=UserController