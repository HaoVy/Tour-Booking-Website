const Receipt = require('../models/Receipt');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Tour = require("../models/Tour")
class ReceiptController {

    showReceipt(req, res, next) {
        res.render('receipt')
    }

    // storeReceipt(req, res, next) {
    //     const formData = req.body;
    //     const receipt = new Receipt(formData);
    //     Receipt
    //         .create({ID_Tour: req.body.tour, nameKH: req.body.name, diachi: req.body.address, SDT: req.body.phone})
    //         .then((receipt) => 
    //             Tour.findById(receipt.ID_Tour)
    //                 .then((tour)=>{
    //                     res.render("showHoaDon", {
    //                         tour: mongooseToObject(tour),
    //                         receipt: mongooseToObject(receipt)
    //                     })
    //                 })
    //         )
    //         .catch((error) => { });

    // }

    list(req, res, next){

        let recQuery = Receipt.find()

        if (req.query.hasOwnProperty('_sort')) {
            recQuery = recQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        recQuery
            .then(receipt => {
                res.render('bill/receipt', {receipt: mutipleMongooseToObject(receipt)});
            })
            .catch(next)
    }

    storeReceipt(req, res, next) {
        User.findOne({ token: { $ne: "logout" } })
            .then(user => {
                Receipt.create({ ID_Tour: req.body.tour, ID_KH: user.id, Ten_Khach: user.username, Dia_Chi: user.address, SDT: user.phone})
                    .then((receipt) => {
                        Tour.findById(receipt.ID_Tour)
                            .then((tour) => {
                                res.render("showHoaDon", {
                                    tour: mongooseToObject(tour),
                                    user: mongooseToObject(user),
                                    receipt: mongooseToObject(receipt)
                                })
                            })
                    })
                    .catch(eror => { });
            })
            .catch()
    }


    deletereceipt(req, res, next) {
        Receipt.deleteOne({ _id: req.params.id })
          .then(() => res.redirect('back'))
          .catch(next);
    }
}

module.exports = new ReceiptController;