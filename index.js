var express = require('express');
var app = express();
var port = 8080;
var cookieParser = require('cookie-parser');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser('asajhsdguyeaiufhu234jvjvhjwda'));

var authMiddleware = require('./Middleware/auth.middleware');

app.get('/',(request,response)=>{
    response.render('index.pug')
});

app.use('/users',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);

app.listen(port,()=>{
    console.log('Server listening on port '+ port);
});