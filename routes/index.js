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
  res.render('capture1')
});

// take in data
router.post('/upload_data', Controller.uploadData)
// router.post('/upload_data', function(req, res, next) {
//   res.status(200).json({whatevs: 'it works!!!!'})
// });

/* GET START page. */
// router.get('/capture/start', Controller.startCapture) 


module.exports = router;
