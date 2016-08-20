var fs = require("fs");
var child = require('child_process');

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

  view: function(req, res, next) {
    var filename = req.params.id
    var filepath = "data/" + filename;

    // read data from file
    var filestream = fs.createReadStream(filepath);

    // start python process
    var process = child.execFile('python', ['oracle/predict.py'], function (err, stdout, stderr) {
      if (err) return next(err);

      // console.log(stdout);
      // console.log(stderr);

      var data = JSON.parse(stdout);
      console.log(data)

      res.status(200).end();
    });

    // write data from file to python process's stdin
    filestream.pipe(process.stdin);

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