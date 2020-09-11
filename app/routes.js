//create new express router
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    eventsController = require('./controllers/events.controller');

//export the router
module.exports = router;

//define routes
//main
router.get('/', mainController.showHome);

//event
router.get('/events', eventsController.showEvents);

//seeding
router.get('/events/seed', eventsController.seedEvents);

//create events

//edit events

//delete events


//single event
router.get('/events/:slug', eventsController.showSingle);
