const express = require('express');
const router = express.Router();
const restaurantController = require('../app/controllers/RestaurantController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.post('/storeRestaurant', middlewareController.verfyTokenandAdminAuth, restaurantController.storeRestaurant);
router.get('/createRestaurant', middlewareController.verfyTokenandAdminAuth, restaurantController.createRestaurant);
router.get('/listRestaurant', middlewareController.verfyTokenandAdminAuth, restaurantController.listRestaurant);
router.get('/:id/editRestaurant', middlewareController.verfyTokenandAdminAuth, restaurantController.editRestaurant);
router.put('/:id', middlewareController.verfyTokenandAdminAuth, restaurantController.updateRestaurant);
router.delete('/:id', middlewareController.verfyTokenandAdminAuth, restaurantController.deleteRestaurant);

module.exports = router;