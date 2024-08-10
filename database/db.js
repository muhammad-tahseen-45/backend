const mongoose = require('mongoose');



async function dbconnect() {

    mongoose.connect('mongodb://127.0.0.1:27017/test');
    mongoose.connection.on('connected', () => console.log(' database is connected'));
    mongoose.connection.on('error', (error) => console.log(  `database is connected ${error}` ));
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = dbconnect


