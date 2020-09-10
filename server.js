//grab dependecies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts');

//config app
//tell express where to look for static assests
app.use(express.static(__dirname + '/public'));

//set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//set routes
app.use(require('./app/routes'));



//start server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
