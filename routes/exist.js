var express = require('express');
var router = express.Router();

//  GET to retrieve an existing site
router.get('/:inputSite', function(req, res) {
  var siteNumber = req.params.inputSite;
  siteNumber = parseInt(siteNumber, 10);
  console.log('Sitenumber asked: ' + siteNumber);

  var db = req.db;
  var collection = db.get('sitescollection');

  collection.findOne({numUrl: siteNumber}, function(err, data) {
    if (err) {
      // Error while searching site, return error
      res.json({'error': err});
    }
    else {
      if (data === null) {
        // Site not found, return error
        res.json({'error': "Provided URL is not found" })
      }
      else {
        // Site found, show it to the user
        console.log("Site found: " + data.sitename);
        if (data.sitename.split('')[0] == 'w') {
          res.redirect( 'http://' + data.sitename);
        } else {
          res.redirect (data.sitename);
        }
      }
    }
  })
});

module.exports = router;
