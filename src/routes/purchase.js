const express = require('express');
const router = express.Router();
const receiptController = require('../app/controllers/PurchaseController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/purchased', receiptController.showReceipt);
router.post('/purchased', receiptController.storeReceipt);
router.delete('/:id', middlewareController.verfyTokenandAdminAuth, receiptController.deletereceipt);
router.get('/list', middlewareController.verfyTokenandAdminAuth, receiptController.list);

module.exports = router;