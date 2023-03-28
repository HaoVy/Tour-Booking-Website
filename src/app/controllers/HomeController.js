const Product= require('../models/Tour');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const PAGE_SIZE=6;
class HomeController{
       index(req, res,next){
        var page=req.query.page;
        if(page){
            page=parseInt(page)
            var soluongboqua=(page-1)*PAGE_SIZE

            Product.find({})
            .skip(soluongboqua)
            .limit(PAGE_SIZE)
            .then(products=>{
                res.render('home',{
                    products:mutipleMongooseToObject(products)
                });
                //res.json(products);
            })
            .catch(next);

        }
        else {

            Product.find({})
            .limit(6)
            .then(products=>{
                res.render('home',{
                    products:mutipleMongooseToObject(products)
                });
                //res.json(products);
            })
            .catch(next);
   }

        }
        

}

module.exports=new HomeController();