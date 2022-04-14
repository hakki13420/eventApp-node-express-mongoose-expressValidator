const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const url ='mongodb+srv://admin:admin@notesApp.tsvsl.mongodb.net/events?retryWrites=true&w=majority';

    mongoose.connect(url)
        .then(res=>console.log("database connected"))
        .catch(err=>{
            console.log(err);
           // router.get('/errors/conn',(req,res)=>res.send('error'))            
        })
