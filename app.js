const express=require('express');
const eventsRoutes=require('./routes/eventsRoutes')
const bodyParser=require('body-parser')

const app = express();

app.set('view engine','ejs')

//static folder
app.use(express.static('public'));
app.use(express.static('node_modules'));
//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events',eventsRoutes)

app.listen(5000,()=>console.log('server started succefully'))