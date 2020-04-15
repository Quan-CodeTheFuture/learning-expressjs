var db = require('../db');
module.exports.login = function(request,response){
    response.render('auth/login.pug');
}

module.exports.postLogin = function(request,response){
    var email = request.body.email;
    var user = db.get('users').find({email:email}).value();
    var password = request.body.password;
    if(!user){
        response.render('auth/login.pug',{
            errors:[
                'User does not exist'
            ],
            value:request.body
        })
        return;
    }

    if(user.password !== password){
        response.render('auth/login',{
            errors:[
                'Wrong password'
            ],
            value:request.body  
        })
        return;
    }
    response.redirect('/users');
}