const passport=require('passport')
const localStrategy=require('passport-local').Strategy
const User=require('../models/User')

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })        
})

//register strategy
passport.use('local.register',new localStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },(req,username,password,done)=>{
        if(req.body.password!=req.body.confirmPassword){
            return done(null,false,req.flash('error','password dont mismatch'))
        }else{
            User.findOne({email:username},(err,user)=>{
                if(err){
                    return done(err)
                }else if(user){
                    return done(null,false,req.flash('error','email already used, please enter an other email'))
                }else if(!user){
                    const newUser=new User()
                    newUser.email=req.body.email,
                    newUser.password=newUser.hashPassword(req.body.password)
                    
                    newUser.save()
                        .then((user)=>{                            
                            return done(null,user,req.flash('success','user added successfuly'))
                        })
                        .catch(err=>req.flash('error','error :'+err))
                }
            })
        }
    }
    )
);

//login strategy
passport.use('login.strategy',new localStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },(req,username,password,done)=>{
        User.findOne({email:username},(err,user)=>{
            if(err){
                return done(null,false,req.flash('error','error in login try again'))
            }
            if(!user){
                return done(null, false,req.flash('error','user not registred please register first'))
            }
            if(user){
                if(user.comparePassword(password,user.password)){                    
                    return done(null,user,req.flash('success','welcom'+user.email))
                }else{
                    return done(null,false,req.flash('error','password error'))
                }
            }
        })
    })
)
