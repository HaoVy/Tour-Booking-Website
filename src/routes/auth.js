const express = require('express');
const router =express.Router();

const authController=require('../app/controllers/AuthController');

const middlewareController = require('../app/controllers/MiddlewareController');
router.post('/logout',authController.logout);
router.get('/register',authController.showregister);
router.get('/user',authController.showlogin);
router.get('/logout',middlewareController.verfyToken,authController.logout);
router.post('/login',authController.loginUser);
router.post('/',authController.registerUser);

module.exports=router;


