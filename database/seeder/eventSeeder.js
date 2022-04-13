
require('../connexion')
const Event= require("../../models/Event")
const data = require('../data')


connect();

data.forEach(event=>{
    const newEvent=new Event(event);    

    newEvent.save()
        .then(()=>console.log('data seeder success'))
        .catch((err)=>console.log(err))    
})