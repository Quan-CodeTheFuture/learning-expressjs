var db = require('../db');
var shortID = require('shortid')

module.exports.index = function(request, response){
    response.render('user.pug',{
        users:db.get('users').value()
    });
};

module.exports.search = (request,response)=>{
    var q = request.query.q;
    var matchedUsers = db.get('users').value().filter(data => data.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
    response.render('user.pug',{
        users:matchedUsers
    });
}

module.exports.create = (request,response)=>{
    response.render('create.pug');
}

module.exports.postCreate = (request,response)=>{
    request.body['id'] = shortID.generate();
    var errors = [];
    if(!request.body.name){
        errors.push('Name is required');        
    }
    if(!request.body.phone){
        errors.push('Phone is required');
    }
    console.log(request.body);
    if(errors.length){
        response.render('create.pug',{
            errors: errors,
            values: request.body
        });
        return;
    }

    db.get('users').push(request.body).write();
    response.redirect('/users');
}

module.exports.getID = (request, response)=>{
    var id = request.params.id;
    var user = db.get('users').find({id:id}).value();
    response.render('view.pug',{
        users:user
    });
}