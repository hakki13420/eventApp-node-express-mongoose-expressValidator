const mongoose=require('mongoose')

const eventSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLenght:10,
        maxLenght:30
    },
    description:{
        type:String,
        required:true,
        minLenght:10,
        maxLenght:50
    },
    location:{
        type:String,      
        required:true
    },
    date:{
        type:Date,        
        default:new Date()
    }    
},
{
    timestamps:true        
}
)

const Event=mongoose.model('Event',eventSchema,'events');

module.exports=Event