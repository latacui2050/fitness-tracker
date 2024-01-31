const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:<password>@cluster0.o4jvlzj.mongodb.net/');

module.exports = mongoose.connection;


