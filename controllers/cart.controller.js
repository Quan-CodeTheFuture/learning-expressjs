const db = require("../db");

module.exports.addToCart = (request,response,next)=>{
    var productId =request.params.productId;
    var sessionId = request.signedCookies.sessionId;
    if(!sessionId){
        response.redirect('/product');
        return;
    }
    if(db.get('sessions').find({id:sessionId}).value()['cart'])
      var count = db.get('sessions').find({id:sessionId}).value()['cart'][productId]
    if (!count) count = 0
    db.get('sessions')
      .find({id:sessionId})
      .set('cart.'+ productId,count + 1)
      .write()
    response.redirect('/product');
}