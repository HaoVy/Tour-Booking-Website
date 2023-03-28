const Hotel = require('../models/Hotel');
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');

class HotelController {

    createHotel(req, res, next){
        res.render('detailHotel/createHotel')
    }

    storeHotel(req, res, next){
        const formData = req.body;
        const hotel = new Hotel(formData);
        hotel.save()
            .then(() => res.redirect('/hotel/listHotel'))
            .catch(error => {

            });
    }

    listHotel(req, res, next){
        let hotQuery = Hotel.find({})

        if (req.query.hasOwnProperty('_sort')) {
            hotQuery = hotQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        hotQuery
            .then(hotel => res.render('detailHotel/listHotel', {
                hotel: mutipleMongooseToObject(hotel)
            }))
            .catch(next);
    }

    editHotel(req, res, next){
        Hotel.findById(req.params.id)
            .then(hotel => res.render('detailHotel/editHotel', {
                hotel: mongooseToObject(hotel)
            }))
            .catch(next);
    }

    updateHotel(req, res, next){
        Hotel.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/hotel/listHotel'))
            .catch(next);
    }

    deleteHotel(req, res, next){
        Hotel.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    

}

module.exports = new HotelController;