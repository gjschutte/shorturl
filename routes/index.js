var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', { title: 'Hello, World'});
});


/* GET Userlist page */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  console.log("collection: " + collection);
  collection.find({},{},function(e,docs){
    console.log('Docs: ' + docs);
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* GET Sitelist page */
router.get('/sitelist', function(req, res) {
  var db = req.db;
  var collection = db.get('sitescollection');
  console.log("collection: " + collection);
  collection.find({},{}, function(e,docs){
    console.log('Docs2: ' + docs);
    res.render('sitelist', {
      "sitelist" : docs
    });
  });
});

/* GET to retrieve a new site name */
router.get('/api/:origUrl', function (req, res, next) {
  var newSite = req.params.origUrl;
  console.log('Site: ' + newSite);
  
  // set the DB variables
  var db = req.db;
  var collection = db.get('sitescollection');
  
  // submit to the DB
  collection.insert({
    "sitename" : newSite
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // Forward to succes pages
      res.redirect("/sitelist");
    }
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
  
  // Set our internal DB variable
  var db = req.db;
  
  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  
  // Set our collection
  var collection = db.get('usercollection');
  
  // Submit to the DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("userlist");
    }
  });
});

module.exports = router;