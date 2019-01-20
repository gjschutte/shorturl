var express = require('express');
var router = express.Router();

// GET index page
router.get('/', function (req, res) {
  res.render('index', { title: 'Short URL'});
});

module.exports = router;