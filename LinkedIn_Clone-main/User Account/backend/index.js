var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');
const port = process.env.PORT || 3001;
var passport = require('passport');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var requireAuth = passport.authenticate('jwt', {session: false});
var crypt = require('./app/crypt');
var db = require('./app/db');
app.use(morgan('dev'));
var kafka = require('./kafka/client');

//console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
  app.post('/login',function(request,response){
    console.log("in request login",request.body.data);
    kafka.make_request('linkedinlogin',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log(results);
            response.json({
                    updatedList:results
                });

                response.end();
            }
        
    });

  });
  app.post('/register',function(request,response){
    console.log("In signup method");
    kafka.make_request('linkedinsignup',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});
app.post('/prodetails',function(request,response){
    console.log("In professional details method");
    kafka.make_request('linkedinprodetails',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});
app.post('/locationdata',function(request,response){
    console.log("In location method");
    kafka.make_request('linkedinloc',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});
app.listen(3001);
console.log("Server Listening on port 3001");