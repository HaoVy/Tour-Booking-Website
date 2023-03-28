const express = require('express');
const router = express.Router();
const hotelController = require('../app/controllers/HotelController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.post('/storeHotel', middlewareController.verfyTokenandAdminAuth, hotelController.storeHotel);
router.get('/createHotel', middlewareController.verfyTokenandAdminAuth, hotelController.createHotel);
router.get('/listHotel', middlewareController.verfyTokenandAdminAuth, hotelController.listHotel);
router.get('/:id/editHotel', middlewareController.verfyTokenandAdminAuth, hotelController.editHotel);
router.put('/:id', middlewareController.verfyTokenandAdminAuth, hotelController.updateHotel);
router.delete('/:id', middlewareController.verfyTokenandAdminAuth, hotelController.deleteHotel);

module.exports = router;