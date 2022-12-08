'use strict';

var express = require('express');

var router = express.Router();
/* GET Input page. */

router.get('/eye-test', function (req, res) {
  res.render('eye-test', {
    title: 'Input to Database',
  });
});
/* POST to Add User Entry */

router.post('/addEntry', function (req, res) {
  // Set our internal DB variable
  var db = req.db; // Get our form values. These rely on the "name" attributes

  var restName = req.body.restname;
  var restDesc = req.body.restdesc;
  var restAdd = req.body.restadd;
  console.log('post received: %s %s', restName, restDesc, restAdd); // Set our collection

  var collection = db.get('restaurants'); // Submit to the DB

  collection.insert(
    {
      name: restName,
      desc: restDesc,
      address: restAdd,
    },
    function (err, doc) {
      if (err) {
        // If it failed, return error
        res.send('There was a problem adding the information to the database.');
      } else {
        // And forward to success page
        res.redirect('/input');
      }
    }
  );
});
module.exports = router;
//# sourceMappingURL=sample.dev.js.map
