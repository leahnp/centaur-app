var express = require('express');
var router = express.Router();
var Controller = require('../controllers/index')
var RideController = require('../controllers/ride')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});


/* GET capture page. */
router.get('/capture', function(req, res, next) {
  res.render('capture')
});

/* GET ride page. */
router.get('/ride', RideController.index)

// take in data from users for predicting
router.get('/ride/:id', RideController.view)

// take in data from users for predicting
router.post('/ride/save', RideController.save)

// take in data for training
router.post('/upload_data', Controller.uploadData)

module.exports = router;
