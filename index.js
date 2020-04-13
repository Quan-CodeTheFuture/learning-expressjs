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

var shortID = require('shortid')

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
    request.body['id'] = shortID.generate();
    db.get('users').push(request.body).write();
    response.redirect('/users');
})

app.get("/users/:id",(request, response)=>{
    var id = request.params.id;
    var user = db.get('users').find({id:id}).value();
    response.render('view.pug',{
        users:user
    })
})

app.listen(port,()=>{
    console.log('Server listening on port '+ port);
})