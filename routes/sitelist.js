var express = require('express');
var router = express.Router();

/* GET Sitelist page */
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('sitescollection');
  collection.find({},{}, function(e,docs){
    res.render('sitelist', {
      "sitelist" : docs
    });
  });
});

module.exports = router;
