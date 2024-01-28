const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fitness-tracker'); //in case localhost doesn't work, use 127.0.0.1:27017

module.exports = mongoose.connection;