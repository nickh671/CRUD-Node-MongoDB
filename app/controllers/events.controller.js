const Event = require('../models/event');

module.exports = {

    //show events
    showEvents: (req, res) => {
        //create dummy data
        

        //return a view with data
        res.render('pages/events', { events: events});
    },

    showSingle: (req, res) => {
        const event = {name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' };

        res.render('pages/single', {event: event});
    },


    //seed our db
    seedEvents: (req, res) => {
        //create events
        const events = [
            { name: 'Basketball', description: 'Throwing into a basket.' },
            { name: 'Swimming', description: 'Michael Phelps is a swimmer.'},
            { name: 'Soccer', description: 'Breaking ankles like Ronaldinho!'}
        ];
        //use the event model to insert/save
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
        //send out seeded message
        res.send('DB SEEDED!');
    }
};