const User = require('../models/User');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class ProfileController {

    profileShow(req, res, next){
        Hotel.find({})
            .then(hotel => res.render('detailHotel/listHotel', {
                hotel: mutipleMongooseToObject(hotel)
            }))
            .catch(next);
    }

}

module.exports = new ProfileController;