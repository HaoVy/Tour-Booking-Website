const express = require('express');
const middlewareController = require('../app/controllers/MiddlewareController');
const router =express.Router();
const userController=require('../app/controllers/UserController');

router.get('/index', middlewareController.verfyTokenandAdminAuth, userController.index);
router.delete('/:id', middlewareController.verfyTokenandAdminAuth, userController.deleteuser);

module.exports=router;


