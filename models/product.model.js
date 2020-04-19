var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    image:String,
    price:String,
    name:String,
    decription:String
});
// Compile model from schema
var Product = mongoose.model('User', productSchema, 'users');

module.exports = Product;