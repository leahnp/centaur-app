var express = require('express');
var router = express.Router();
// var Controller = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.status(200).json({whatevs: 'it works!!!!'})
  res.render('index')
});
module.exports = router;
