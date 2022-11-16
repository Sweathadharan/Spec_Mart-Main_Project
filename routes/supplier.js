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

router.route('/supplier').get(isAdmin, function (req, res) {
  var selectQuery = '\
              SELECT *\
              FROM Users';

  RunQuery(selectQuery, function (customers) {
    var contextDict = {
      title: 'Admin - Customomer',
      supplier: req.supplier,
      suppliers: suppliers,
    };

    res.render('admin/supplier', contextDict);
  });
});

router.route('/supplier/:id/makeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Users\
              SET Admin = 1\
              WHERE UserID = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/supplier/');
  });
});

router.route('/supplier/:id/removeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
              UPDATE Users\
              SET Admin = 0\
              WHERE UserID = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/supplier/');
  });
});

router.route('/supplier/:id/delete').post(isAdmin, function (req, res) {
  var deleteQuery =
    '\
              DELETE FROM Users\
              WHERE UserID = ' +
    req.params.id;

  RunQuery(deleteQuery, function (result) {
    res.redirect('/admin/supplier/');
  });
});

module.exports = router;
