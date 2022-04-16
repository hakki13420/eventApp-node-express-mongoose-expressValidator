const mongoose=require('mongoose')
const bcrypt=require('bcrypt-nodejs');

const schemaUser=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
}, 
{
    timestamps:true
}
)
//hashing password
schemaUser.methods.hashPassword=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

schemaUser.methods.comparePassword=(password,hash)=>{
    return bcrypt.compareSync(password,hash)
}

const User = mongoose.model('User',schemaUser,'users');

module.exports=User

