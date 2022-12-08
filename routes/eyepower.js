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

router.route('/eyepower').get(isAdmin, function (req, res) {
  var selectQuery = '\
              SELECT *\
              FROM Eyepower';

  RunQuery(selectQuery, function (eyepowers) {
    var contextDict = {
      title: 'Admin - Eyepower',
      eyepower: req.eyepower,
      eyepowers: eyepowers,
    };

    res.render('admin/eyepower', contextDict);
  });
});

router.route('/eyepower/:id/makeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Eyepower\
              SET Admin = 1\
              WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/eyepower/');
  });
});

router.route('/eyepower/:id/removeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Eyepower\
              SET Admin = 0\
              WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/eyepower/');
  });
});

router.route('/eyepower/:id/delete').post(isAdmin, function (req, res) {
  var deleteQuery =
    '\
              DELETE FROM Eyepower\
              WHERE id = ' +
    req.params.id;

  RunQuery(deleteQuery, function (result) {
    res.redirect('/admin/eyepower/');
  });
});

module.exports = router;
