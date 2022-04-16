require('../database/connexion')
const mongoose=require('mongoose')
const Event=require('../models/Event')
const {nbEventPage, getPages, getNbPage}=require('../config/pagination')

let pages=[]

class eventController{ 

    //get pagination
    static getPagination(req,res){
        pages=[]
       Event.find() 
        .then((events)=>{
            pages=getPages(events);
            const page=req.params.id
            const eventsPage=events.slice((page-1)*nbEventPage,page*nbEventPage)
            res.render('events/events',{events:eventsPage,pages:pages,pageActual:page})
        })
    }

    //get all events
    static getAllEvents(req,res){
        pages=[]
        const message=req.flash('info')
        Event.find()
            .then((events)=> {
                pages=getPages(events)
                const eventsPage=events.slice(0,nbEventPage)
                res.render('events/events',{events:eventsPage,message,pages:pages,pageActual:1})
            })        
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
            date:req.body.date,
            user_id:req.user.id
        });        
        newEvent.save()
            .then(()=>{
                req.flash('info','event added successfuly')
                res.redirect('/events')
            })
            .catch(err=>console.log(err))
    }

    static editEvent(req,res){
        const errors=req.flash('errors')
        Event.findById({_id:req.params.id})
                .then(event=>res.render('events/edit',{event,errors}))
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