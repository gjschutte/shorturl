var express = require('express');
var router = express.Router();
var async = require('async');

/* GET to add a new site name */
router.get('/:inputLink(*)', function(req, res) {
  var url = req.params.inputLink;
  console.log('Site: ' + url);

  var db = req.db;
  var collection = db.get('sitescollection');
  
  // Get a unique number as a short url
  var uniqueNum = false;
  var newNum = 0;

  async.whilst (
    function () { return uniqueNum == false; },
    function (callback) {
      // hier de tekst
      newNum = Math.floor(Math.random() * 1000);
      console.log("Newnum: " + newNum);
      // newNum = 78;
      console.log("Newnum: " + newNum);
    
      collection.find({numUrl: newNum}, function(err, data) {
        if (err) {
          uniqueNum = true;
          console.log("Error with checking number");
        }
        else {
          if (data.length === 0) {
            uniqueNum = true;
            console.log ("Unique number found");
          }
          else {
            console.log ("Number already exists");
          }
        }
      })
      console.log("uniqueNum:" + uniqueNum);
    },
    function (err) {
      // While gereed
    }
  );
  console.log ("While is ready");

  // now insert the new site
  return collection.insert({
    "sitename" : url,
    "numUrl" : newNum
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // Forward to succes pages
      res.redirect("/sitelist");
      console.log("Insert succesfull");
    }
  })
});

module.exports = router;
