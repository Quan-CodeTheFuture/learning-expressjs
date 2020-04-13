var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser')
var users = [
    {id:1, name:'Lebron'},
    {id:2, name:'Quan'}
]

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',function(request,response){
    response.render('index.pug',{
        name:'Quan'
    });
})

app.get('/users',function(request,response){
    response.render('user.pug',{
        users:users
    });
})

app.get('/users/search', (request, response)=>{
    var qu=request.query.q;
    // console.log(request.query);
    var matchedUsers = users.filter(data => data.name.toLocaleLowerCase().indexOf(qu.toLocaleLowerCase()) !== -1)
    response.render('user.pug',{
        users:matchedUsers,
        nameInput:request.query.q
    })
})

app.get('/users/create',function(request,response){
    response.render('create.pug')
})

app.post('/users/create',(request,response)=>{
    console.log(request.body);
    var data= request.body['id']=users.length+1;
    users.push(request.body);
    response.redirect('/users');
})

app.listen(port,function(){
    console.log('Server listening on port ' + port);
})