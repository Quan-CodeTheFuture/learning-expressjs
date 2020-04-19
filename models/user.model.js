var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    phone:String
});
// Compile model from schema
var User = mongoose.model('User', userSchema, 'users');

module.exports = User;