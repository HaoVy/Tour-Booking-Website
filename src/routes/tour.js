const express = require('express');
const router = express.Router();
const tourController = require('../app/controllers/TourController');
const middlewareController = require('../app/controllers/MiddlewareController');

// router.get('/test', tourController.test);
//router.get('/test', tourController.test);
router.get('/create', middlewareController.verfyTokenandAdminAuth, tourController.create);
router.post('/store', middlewareController.verfyTokenandAdminAuth, tourController.store);
router.get('/list', middlewareController.verfyTokenandAdminAuth, tourController.list);
router.get('/:id/edit', middlewareController.verfyTokenandAdminAuth, tourController.edit);
router.put('/:id', middlewareController.verfyTokenandAdminAuth, tourController.update);
router.delete('/:id', middlewareController.verfyTokenandAdminAuth, tourController.delete);
router.get('/:slug', tourController.show);
router.get('/', tourController.index);

module.exports = router;
