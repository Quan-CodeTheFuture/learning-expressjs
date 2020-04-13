var express = require('express');
var app = express();
var port = 8080;

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
const { request, response } = require('express');
var adapter = new FileSync('db.json');
var db = low(adapter);

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',(request,response)=>{
    response.render('index.pug')
})

app.get('/users',(request,response)=>{
    response.render('user.pug',{
        users:db.get('users').value()
    })
})

app.get("/users/Search",(request,response)=>{
    var q = request.query.q;
    var matchedUsers = db.get('users').value().filter(data => data.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
    response.render('user.pug',{
        users:matchedUsers
    });
})

app.get("/users/create",(request,response)=>{
    response.render('create.pug');
})

app.post("/users/create",(request,response)=>{
    console.log(request.body);
    request.body['id'] = db.get('users').value().length + 1;
    db.get('users').push(request.body).write();
    response.redirect('/users');
})

app.listen(port,()=>{
    console.log('Server listening on port '+ port);
})