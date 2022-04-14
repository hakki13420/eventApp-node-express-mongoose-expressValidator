require('../database/connexion')
const mongoose=require('mongoose')
const Event=require('../models/Event')

class eventController{

    //get all events
    static getAllEvents(req,res){
        const message=req.flash('info')
        Event.find()
            .then((events)=> res.render('events/events',{events,message}))        
            .catch(err=>console.log(err))
    }

    static CreateEvent(req,res){
        //const errors=[]
        const errors=req.flash('errors')
        res.render('events/create',{errors,req})
    }

    static addEvent(req,res){
        const newEvent=new Event({
            title:req.body.title,
            description:req.body.description,
            location:req.body.location,
            date:req.body.date
        });        
        newEvent.save()
            .then(()=>{
                req.flash('info','event added successfuly')
                res.redirect('/events')
            })
            .catch(err=>console.log(err))
    }

    static editEvent(req,res){
        Event.findById({_id:req.params.id})
                .then(event=>res.render('events/edit',{event}))
                .catch(err=>console.log(err))
    }


    static removeEvent(req,res){
        Event.findByIdAndDelete(req.params.id,(err)=>{
            if(!err){
                req.flash('info','event deleted successfuly')
                res.redirect('/events')
            }else{
                console.log(err)
            }
        })          
            
    }

    static updateEvent(req,res){
        const eventUpdate={
            title:req.body.title,
            description:req.body.description,
            location:req.body.location,
            date:req.body.date,
        }

        Event.findByIdAndUpdate({_id:req.params.id},eventUpdate)
            .then(()=>{
                req.flash('info','event updated succefully')
                res.redirect('/events')
            })
            .catch(err=>console.log(err))
    }


}

module.exports=eventController