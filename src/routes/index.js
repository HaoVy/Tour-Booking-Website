const homeRouter=require('./home');

const authRouter=require('./auth');

const userRouter=require('./User');

const tourRouter=require('./tour');

const hotelRouter=require('./hotel');

const restaurantRouter=require('./restaurant');

const profileRouter=require('./profile');

const purchaseRouter = require('./purchase');

function route(app){

    app.use('/purchase', purchaseRouter);

    app.use('/profile', profileRouter);

    app.use('/hotel',hotelRouter);

    app.use('/tour',tourRouter);

    app.use('/restaurant',restaurantRouter);

    app.use('/user',userRouter);

    app.use('/auth',authRouter);

    app.use('/',homeRouter);
}
module.exports = route;