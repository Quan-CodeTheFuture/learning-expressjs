var express = require('express');
var app = express();
var port = 8080;

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/',function(request,response){
    response.render('index',{
        name:'Quan'
    });
})

app.get('/users',function(request,response){
    response.render('user',{
        names:['Quan','Duy','Lebron']
    });
})

app.listen(port,function(){
    console.log('Server listening on port' + port);
})