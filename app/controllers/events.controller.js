const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit,
    deleteEvent: deleteEvent
}

//show events
function showEvents (req, res) {
    //get all events
    Event.find({}, (err, events) => {
        if(err) {
            res.status(404);
            res.send('Events not found!');
        }

        //return a view with data
        res.render('pages/events', { 
            events: events,
            success: req.flash('success')
        });
    });
}

function showSingle (req, res) {
    //get single event
    Event.findOne({slug: req.params.slug }, (err, event) => {
        if(err) {
            res.status(404);
            res.send('Event not found!');
        }

        res.render('pages/single', {
            event: event,
            success: req.flash('success')
        });
    });


}


//seed our db
function seedEvents (req, res) {
    //create events
    const events = [
        { name: 'Basketball', description: 'Throwing into a basket.' },
        { name: 'Swimming', description: 'Michael Phelps is a swimmer.'},
        { name: 'Soccer', description: 'Breaking ankles like Ronaldinho!'},
        { name: 'Ping Pong', description: 'Super fast paddles.'}
    ];
    //use the event model to insert/save

    Event.remove({}, () =>{
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });

    //send out seeded message
    res.send('DB SEEDED!');
}

function showCreate(req, res) {
    res.render('pages/create', {
        errors: req.flash('errors')
    });
}

function processCreate(req, res) {
    //validate information
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required.').notEmpty();

    //if errors, redirect and save errors to the flash data
    const errors = req.validationErrors();
    if(errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/events/create');
    }

    //create new event
    const event = new Event({
        name: req.body.name,
        description: req.body.description
    });

    event.save((err) =>{
        if (err)
            throw err;


        //set a successful flash message
        req.flash('success', 'Successfully created event!');

        //redirect to the newly created event
        res.redirect(`/events/${event.slug}`);
    });
}

function showEdit (req, res) {
    Event.findOne({slug: req.params.slug}, (err, event) => {
        res.render('pages/edit', {
            event: event,
            errors: req.flash('errors')
        });
    });
    
}

function processEdit (req, res) {
    //validate information
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required.').notEmpty();

    //if errors, redirect and save errors to the flash data
    const errors = req.validationErrors();
    if(errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/events/${req.parms.slug}/edit`);
    }

    //finding current event

    Event.findOne({slug: req.params.slug}, (err, event) => {
        //updating the event
        event.name = req.body.name;
        event.description = req.body.description;

        event.save((err) => {
            if(err)
                throw err;
            
            //success flash message
            req.flash('success', 'Successfully updated event.');

            //redirect the user back to the events page
            res.redirect('/events');
        });
    });
}

function deleteEvent(req, res) {
    Event.remove({ slug: req.params.slug }, (err) => {
        //set flash data
        //redirect back to events page

        req.flash('success', 'Event deleted!');
        res.redirect('/events');
    });
}