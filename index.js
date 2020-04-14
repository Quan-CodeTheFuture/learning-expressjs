var express = require('express');
var app = express();
var port = 8080;

var userRoute = require('./routes/user.route')

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var shortID = require('shortid')

app.get('/',(request,response)=>{
    response.render('index.pug')
});

app.use('/users',userRoute);

app.listen(port,()=>{
    console.log('Server listening on port '+ port);
});