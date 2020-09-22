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
router.get('/events/create', eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);

//edit events
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug', eventsController.processEdit);

//delete events
router.get('/events/:slug/delete', eventsController.deleteEvent);

//single event
router.get('/events/:slug', eventsController.showSingle);
