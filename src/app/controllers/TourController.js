const Tour = require('../models/Tour');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const PAGE_SIZE = 6;

class TourController {

  index(req, res, next) {
    var page = req.query.page;
    if (page) {
      page = parseInt(page);
      if (page < 1) {
        page = 1;
      }
      var pageSkip = (page - 1) * PAGE_SIZE;

      Tour.find({})
        .skip(pageSkip)
        .limit(PAGE_SIZE)
        .then((tour) => {
          res.render('tour', {
            tour: mutipleMongooseToObject(tour)
          });
        })
        .catch(next);
    } else {
      Tour.find({})
        .then((tour) => {
          res.render('tour', {
            tour: mutipleMongooseToObject(tour),
          });
        })
        .catch(next);
    }
  }

  show(req, res, next) {
    Tour.findOne({ slug: req.params.slug })
      .then((tour) =>
        Hotel.findOne({ _id: tour.ID_KS })
          .then((hotel) =>
            Restaurant.find({ _id: { $in: tour.ID_NH } })
              .then((restaurant) => {
                //console.log(restaurant)
                res.render('detailTour/show', {
                  tour: mongooseToObject(tour),
                  hotel: mongooseToObject(hotel),
                  restaurant: mutipleMongooseToObject(restaurant),
                })
              }
              )
          )
      )
      .catch(next);
  }

  create(req, res, next) {
    res.render('detailTour/create');
  }

  store(req, res, next) {
    const formData = req.body;
    const tour = new Tour(formData);
    tour
      .save()
      .then(() => res.redirect('/tour/list'))
      .catch((error) => { });
  }

  list(req, res, next) {

    let tourQuery = Tour.find({});

    if(req.query.hasOwnProperty('_sort')){
      tourQuery = tourQuery.sort({
        [req.query.column]: req.query.type
      });
    }

    tourQuery
      .then((tour) =>
        res.render('detailTour/list', {
          tour: mutipleMongooseToObject(tour),
        })
      )
      .catch(next);
  }

  edit(req, res, next) {
    Tour.findById(req.params.id)
      .then((tour) =>
        res.render('detailTour/edit', {
          tour: mongooseToObject(tour),
        })
      )
      .catch(next);
  }

  update(req, res, next) {
    Tour.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/tour/list'))
      .catch(next);
  }

  delete(req, res, next) {
    Tour.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

}

module.exports = new TourController();
