require('dotenv').config();
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pool = require('./pool');
var pgSession = require('connect-pg-simple')(session);
var fs = require('fs');
var util = require('./util');

var app = express();

app.use(session({
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done){
    return done(null, {});
  }
));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next){
  res.locals.req = req;
  res.locals.res = res;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
util.getFiles('./routes').forEach(file => {
  if(file=='routes/index.js') return;
  var routeName = './'+file;
  var route = require(routeName);
  var routePath = '/'+file.replace(/routes\/(.+)\.\w+?$/,'$1');
  app.use(routePath, route);
  console.log('Dynamic route: ' + routePath + ' => ' + routeName);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('App listening on port '+port);
});

module.exports = app;
