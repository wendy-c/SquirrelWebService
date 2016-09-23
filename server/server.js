var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
//var login = require('../../client/index');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ 
  secret: 'keyboard squirrel',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//OAuth configuration
app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
  clientID: '1284182081633868',
  clientSecret: '1b118f7cd28230cc8e1167c6c46a7b73',
  callbackURL: 'http://localhost:3010/auth/facebook/callback'
},
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({}, function(err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  }
));

//user ID is serialized to the session, when a request of the same ID is received it will restore the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get('/')

app.post('/login', passport.authenticate('local'), function(req, res) {
  //if this function gets invoked, authentucation was successful
  // `req.user` contains the authenticated user.
  //res.redirect('/links/' + req.user.id);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('auth.facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

app.listen('3010', function() {
  console.log('listening on port 3010!');
});