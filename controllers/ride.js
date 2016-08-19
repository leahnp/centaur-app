var fs = require("fs");

var IndexController = {


  index: function(req, res, next) {
    fs.readdir('data', function(err, files) {
      if (err) {
        return next(err)
      }
      var rides = [];
      for (var file of files) {
        if (file.includes("user-")) {
          rides.push(file)
        }
      }
      res.render('ride', {rides: rides})
    })
  },

  view: function(req, res) {
    // var spawn = require('child_process').spawn,
    // py    = spawn('python', ['../oracle/predict.py']),
    // data = [1,2,3,4,5,6,7,8,9],
    // dataString = '';

  },

  save: function(req, res, next) {
    var data = req.body.data;
    // list of x, y, z accel values
    var output = "";
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      output += row[0] + " " + row[1] + " " + row[2] + " " + row[3] +"\n";
    }

    // generate unique file name
    var splitOutput = output.split(' ') 
    var filename = "user-" + parseInt(splitOutput[0]) + ".dat"
    var filepath = "data/" + filename;

    fs.writeFile(filepath, output, function(err) {
      if (err) {  
        return next(err)
      } 
      res.status(200).json({});
    });
  }
}



module.exports = IndexController