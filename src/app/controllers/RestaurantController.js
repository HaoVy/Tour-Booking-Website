const Restaurant = require('../models/Restaurant');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class RestaurantController {

    createRestaurant(req, res, next) {
        res.render('detailRestaurant/createRestaurant')
    }

    storeRestaurant(req, res, next) {
        const formData = req.body;
        const restaurant = new Restaurant(formData);
        restaurant.save()
            .then(() => res.redirect('/restaurant/listRestaurant'))
            .catch(error => {

            });
    }

    listRestaurant(req, res, next) {
        let resQuery = Restaurant.find({})

        if (req.query.hasOwnProperty('_sort')) {
            resQuery = resQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        resQuery
            .then(restaurant => res.render('detailRestaurant/listRestaurant', {
                restaurant: mutipleMongooseToObject(restaurant)
            }))
            .catch(next);
    }

    editRestaurant(req, res, next) {
        Restaurant.findById(req.params.id)
            .then(restaurant => res.render('detailRestaurant/editRestaurant', {
                restaurant: mongooseToObject(restaurant)
            }))
            .catch(next);
    }

    updateRestaurant(req, res, next) {
        Restaurant.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/restaurant/listRestaurant'))
            .catch(next);
    }

    deleteRestaurant(req, res, next) {
        Restaurant.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }



}

module.exports = new RestaurantController;