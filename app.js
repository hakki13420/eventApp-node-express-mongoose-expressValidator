const express=require('express');
const eventsRoutes=require('./routes/eventsRoutes')
const usersRoutes=require('./routes/usersRoutes')
const bodyParser=require('body-parser');
const session = require('express-session')
const flash = require('connect-flash')
const passport =require('passport')
const passportSetup=require('./config/passport-setup')

const app = express();

//using ejs engine views
app.set('view engine','ejs')

//static folder
app.use(express.static('public'));
app.use(express.static('node_modules'));
//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//session and flash (settings)
app.use(session({
    secret: 'hakki',
    resave: false,
    saveUninitialized: true,
    cookie: { MaxAge: 60000 * 15 }
  }))
  app.use(flash())

//integration passport js
  app.use(passport.initialize())
  app.use(passport.session())

//=============routes==========
//home route
app.get('/',(req,res)=>res.redirect('/events'))
//events routes
app.use('/events',eventsRoutes)
//users routes
app.use('/users',usersRoutes)


app.listen(5000,()=>console.log('server started succefully'))