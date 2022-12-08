var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');

// database module
var database = require('../config/database');
var RunQuery = database.RunQuery;
function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.Admin == 1) {
      return next();
    } else {
      res.redirect('/' + req.user.Username);
    }
  }

  res.redirect('/');
}

router.route('/franchise').get(isAdmin, function (req, res) {
  var selectQuery = '\
              SELECT *\
              FROM Franchise';

  RunQuery(selectQuery, function (Franchises) {
    var contextDict = {
      title: 'Admin - Appointment',
      Franchise: req.Franchise,
      Franchises: Franchises,
    };

    res.render('admin/franchise', contextDict);
  });
});

router.route('franchise/:id/makeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Franchise\
              SET Admin = 1\
              WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/franchise/');
  });
});

router.route('/franchise/:id/removeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Franchise\
              SET Admin = 0\
              WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/franchise/');
  });
});

router.route('/franchise/:id/delete').post(isAdmin, function (req, res) {
  var deleteQuery =
    '\
              DELETE FROM Franchise\
              WHERE id = ' +
    req.params.id;

  RunQuery(deleteQuery, function (result) {
    res.redirect('/admin/franchise/');
  });
});
router.route('/franchise').get(isAdmin, function (req, res) {
  var selectQuery = '\
              SELECT *\
              FROM Franchise';

  RunQuery(selectQuery, function (franchises) {
    var contextDict = {
      title: 'Admin - franchise',
      franchise: req.franchise,
      franchises: franchises,
    };

    res.render('admin/franchise', contextDict);
  });
});

router.route('/franchise/:id/makeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Franchise\
              SET Admin = 1\
              WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/franchise/');
  });
});

router.route('/franchise/:id/removeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Franchise\
              SET Admin = 0\
              WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/franchise/');
  });
});

router.route('/franchise/:id/delete').post(isAdmin, function (req, res) {
  var deleteQuery =
    '\
              DELETE FROM Franchise\
              WHERE id = ' +
    req.params.id;

  RunQuery(deleteQuery, function (result) {
    res.redirect('/admin/franchise/');
  });
});

module.exports = router;
