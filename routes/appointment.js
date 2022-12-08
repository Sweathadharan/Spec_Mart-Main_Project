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

router.route('/appointment').get(isAdmin, function (req, res) {
  var selectQuery = '\
                SELECT *\
                FROM Appoint';

  RunQuery(selectQuery, function (Appointments) {
    var contextDict = {
      title: 'Admin - Appointment',
      Appointment: req.Appointment,
      Appointments: Appointments,
    };

    res.render('admin/appointment', contextDict);
  });
});

router.route('/appointment/:id/makeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
                UPDATE Appoint\
                SET Admin = 1\
                WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/appointment/');
  });
});

router.route('/appointment/:id/removeAdmin').post(isAdmin, function (req, res) {
  var updateQuery =
    '\
                UPDATE Appoint\
                SET Admin = 0\
                WHERE id = ' +
    req.params.id;

  RunQuery(updateQuery, function (result) {
    res.redirect('/admin/appointment/');
  });
});

router.route('/appointment/:id/delete').post(isAdmin, function (req, res) {
  var deleteQuery =
    '\
                DELETE FROM Appoint\
                WHERE id = ' +
    req.params.id;

  RunQuery(deleteQuery, function (result) {
    res.redirect('/admin/appointment/');
  });
});

module.exports = router;
