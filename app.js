var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var hbs = require('hbs');
var bodyParser = require('body-parser');

var todoRoutes = require('./routes/todoRoutes.js');

var app = express();

// Use handlebars instead of JADE
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, '/views/partials')); // handlebars layout for each todoo

// Middleware for handling form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Custom Middlewares for static folders and favicon
app.use(express.static(path.join(__dirname, 'public')));

// Register custom routers
app.use("/", todoRoutes);

// Register 404 handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Prevent stacktrace leaking to user
app.use(function(err, req, res, next) {
    if(err.status != 404){
        console.log(err.stack);
    }
    res.status(err.status || 500);
    res.render('error', {
        'error': {
          message: err.message,
          status: err.status,
      }
    });
});

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
