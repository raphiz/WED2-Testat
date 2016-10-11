var express = require('express');
var favicon = require('serve-favicon')
var hbs = require('express-hbs');
var bodyParser = require('body-parser');
var todoRoutes = require('./routes/todoRoutes.js');

var app = express();

// Use handlebars instead of JADE
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Middleware for handling form data
app.use(bodyParser.urlencoded({ extended: true }));

// Custom Middlewares for static folders and favicon
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.png'));

// Register custom routers
app.use("/", todoRoutes);

// Serve the app
const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
