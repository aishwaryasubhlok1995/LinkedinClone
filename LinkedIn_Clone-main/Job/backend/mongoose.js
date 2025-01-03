var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/UserData');
mongoose.connect('mongodb://admin:admin12@ds247830.mlab.com:47830/homeaway');

module.exports = {mongoose};