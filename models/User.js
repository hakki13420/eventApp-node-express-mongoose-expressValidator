const mongoose=require('mongoose')

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

const User = mongoose.model('User',schemaUser,'users');

module.exports=User

