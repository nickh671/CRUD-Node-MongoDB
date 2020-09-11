//load environment variables
require('dotenv').config();

//grab dependecies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');

//config app
//tell express where to look for static assests
app.use(express.static(__dirname + '/public'));

//set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//connect to db
mongoose.connect(process.env.DB_URI);

//set routes
app.use(require('./app/routes'));



//start server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
