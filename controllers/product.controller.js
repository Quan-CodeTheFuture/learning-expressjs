var db = require('../db');
module.exports.pageProduct = (request,response)=>{
    var n = 8;
    var page = request.query.page? request.query.page:1;
    var start = ((page-1))*n;
    var end = (page)*n;
    response.render('product/product.pug',{
        listArrayProduct:db.get('products').value().slice(start,end),
        values:parseInt(page)
    })
}