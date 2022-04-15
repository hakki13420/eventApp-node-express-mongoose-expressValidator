const express = require('express');
const router= express.Router()
const eventController = require('../controller/eventController')
const { body, validationResult } = require('express-validator');


router.get('/',eventController.getAllEvents)

router.get('/create',eventController.CreateEvent)

router.post('/',
            [
            body('title').isLength({min:5})
            .withMessage('the title field must be more than 5 caracter'),
            body('description').isLength({min:10}).isString()
            .withMessage('the descriptio, field must be more than 10 caracter'),
            body('location').isLength({min:5}).isString()
            .withMessage('the location field must be more than 5 caracter'),
            body('date').isDate()            
            ],(req,res)=>{
                const errors=validationResult(req)                
             
                if(errors.isEmpty()) eventController.addEvent(req,res)
                else {
                    req.flash('errors',errors.array());
                    res.redirect('/events/create')
                    //res.render('events/create',{errors,req});
                }
            }
            )

router.get('/:id',eventController.editEvent)
router.post('/remove/:id',eventController.removeEvent)
router.post('/update/:id',[
            body('title').isLength({min:5}).withMessage('the title should have 5 caracter at min'),
            body('description').isLength({min:10}).withMessage('the description should have at min 10 caracters'),
            body('location').isLength({min:5}).withMessage('the location should have at min 10 caracters'),
            body('date').isDate()
            ],
            (req,res)=>{
                const errors=validationResult(req);
                console.log('errors',errors)
                console.log('empty',errors.isEmpty())
                if(errors.isEmpty()){
                    eventController.updateEvent(req,res)
                }else{
                    req.flash('errors',errors.array())
                    res.redirect('/events/'+req.params.id)                    
                }
            }
            );


module.exports=router