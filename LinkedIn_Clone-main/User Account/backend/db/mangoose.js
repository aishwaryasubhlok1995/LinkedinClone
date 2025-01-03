var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//  mongoose.connect('mongodb://localhost:27017/HomeAway');
mongoose.connect('mongodb://kesha:kesha123@ds155718.mlab.com:55718/homeaway');

module.exports = {mongoose};