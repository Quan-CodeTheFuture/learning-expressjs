module.exports.validate = function(request,response,next){
    var errors = [];
    if(!request.body.name){
        errors.push('Name is required');        
    }
    if(!request.body.phone){
        errors.push('Phone is required');
    }
    console.log(request.body);
    if(errors.length){
        response.render('users/create.pug',{
            errors: errors,
            values: request.body
        });
        return;
    };
    next();
}