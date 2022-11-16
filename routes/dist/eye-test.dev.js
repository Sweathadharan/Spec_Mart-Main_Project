"use strict";

var express = require('express');

var router = express.Router(); // load all the things we need

var LocalStrategy = require('passport-local').Strategy; // Generate Hash


var bcrypt = require('bcrypt-nodejs'); // database module


var database = require('../config/database');

var RunQuery = database.RunQuery;
/* Route Contact-us page. */
// router.route('/')
//     .get(function (req, res, next) {
//         var contextDict = {
//             currentUrl: '/eye-test',
//             title: 'Eye test',
//             customer: req.user
//         };
//         res.render('eye-test', contextDict);
//     })

/* GET Input page. */
// expose this function to our app using module.exports

module.exports = function (passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.UserID);
  });
  passport.use('eye-test', new LocalStrategy({
    // by default, local strategy uses username and password
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback

  }, function (req, username, password, done) {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    var email = req.body.email;

    if (password != req.body.rePassword) {
      return done(null, false, req.flash('signUpError', 'Passwords do not match.'));
    } else {
      var selectQuery = 'SELECT *\
                    FROM user1\
                    WHERE email = \'' + email + '\'';
      RunQuery(selectQuery, function (emailRows) {
        if (emailRows.length > 0) {
          return done(null, false, req.flash('signUpError', 'Email address has already been used.'));
        } else {
          selectQuery = '\
                        SELECT *\
                        FROM user1\
                        WHERE username = \'' + username + '\'';
          RunQuery(selectQuery, function (usernameRows) {
            if (usernameRows.length > 0) {
              return done(null, false, req.flash('signUpError', 'Username has already been used.'));
            } else {
              // if there is no user with that user and email
              var fullName = req.body.fullName;
              var phone = req.body.phone;
              var address = req.body.streetAddress;
              var postcode = req.body.postcode;
              var city = req.body.city;
              var country = req.body.country;
              var passwordHash = bcrypt.hashSync(password, null, null);
              var insertQuery = 'INSERT INTO user1\
                                    VALUES(null,\
                                    \'' + fullName + '\', \
                                    \'' + address + '\', \
                                    \'' + postcode + '\', \
                                    \'' + city + '\', \
                                    \'' + country + '\', \
                                    \'' + phone + '\', \
                                    \'' + email + '\', \
                                    \'' + username + '\', \
                                    \'' + passwordHash + '\', 0)';
              RunQuery(insertQuery, function (insertResult) {
                //user
                var user = {
                  UserID: insertResult.insertId
                };
                insertQuery = 'INSERT INTO Addresses\
                                    VALUES(null, ' + insertResult.insertId + ', \'' + fullName + '\', \'' + address + '\', \'' + postcode + '\', \'' + city + '\', \'' + country + '\', \'' + phone + '\')';
                RunQuery(insertQuery, function (addRow) {
                  return done(null, user);
                });
              });
            }
          });
        }
      });
    }
  }));
}; // router.get('/', function(req, res) {
//     res.render('eye-test');
//     });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO sampledb (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });


module.exports = router;
//# sourceMappingURL=eye-test.dev.js.map
