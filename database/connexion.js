const mongoose=require('mongoose')
const url ='mongodb+srv://admin:admin@notesApp.tsvsl.mongodb.net/events?retryWrites=true&w=majority';


    mongoose.connect(url)
        .then(res=>console.log("database connected"))
        .catch(err=>console.log("error in connecting to database : "+err))
