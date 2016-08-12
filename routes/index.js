var express = require('express');
var router = express.Router();
var Controller = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.status(200).json({whatevs: 'it works!!!!'})
  res.render('index')
});


/* GET capture page. */
router.get('/capture', function(req, res, next) {
  // res.status(200).json({whatevs: 'it works!!!!'})
  res.render('capture')
});

/* GET START page. */
router.get('/capture/start', Controller.startCapture) 


module.exports = router;
