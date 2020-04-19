require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL);

var app = express();
var port = 8080;
var cookieParser = require('cookie-parser');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route')
var sessionMiddleware = require('./Middleware/session.middleware');
var cartRoute = require('./routes/cart.route')


app.set('view engine','pug');
app.set('views', './views');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);


var authMiddleware = require('./Middleware/auth.middleware');

app.get('/',(request,response)=>{
    response.render('index.pug')
});

app.use('/users',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);

app.listen(port,()=>{
    console.log('Server listening on port '+ port);
});