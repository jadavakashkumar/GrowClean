var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/GrowClean");
  require('./models/models.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon( __dirname + "/public/images/favicon.ico"));
app.use(logger('dev'));
app.use(session({
    secret: 'Akash Secret'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


// Initialize models
require('./models/models.js');

// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

app.use('/bower', express.static(__dirname + '/bower_components/'));

app.use('/', routes);
app.use('/api',api);
app.use('/auth',authenticate);
require('./models/routes.js')(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
