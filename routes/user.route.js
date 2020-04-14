var express = require('express');
var router = express.Router();

var db= require('../db');

var shortID = require('shortid');
router.get('/',(request,response)=>{
    response.render('user.pug',{
        users:db.get('users').value()
    });
});

router.get("/Search",(request,response)=>{
    var q = request.query.q;
    var matchedUsers = db.get('users').value().filter(data => data.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
    response.render('user.pug',{
        users:matchedUsers
    });
});

router.get("/create",(request,response)=>{
    response.render('create.pug');
});

router.post("/create",(request,response)=>{
    request.body['id'] = shortID.generate();
    db.get('users').push(request.body).write();
    response.redirect('/users');
});

router.get("/:id",(request, response)=>{
    var id = request.params.id;
    var user = db.get('users').find({id:id}).value();
    response.render('view.pug',{
        users:user
    });
});
module.exports = router;