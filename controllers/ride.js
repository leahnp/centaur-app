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
      var string_data = stdout;
      // var data = JSON.parse(stdout);

      var walk = 0
      var trot = 0
      var canter = 0
      var gaits = [0, 0, 0]

      // count occurances of walk, trot, canter
      for (var array of JSON.parse(string_data)) {
        if (array[2] == 0) {
          walk += 1;
        } else if (array[2] == 1) {
          trot += 1;
        } else {
          canter += 1;
        }
      }

      // set percentage of time spent walk, trot and cantering
      gaits[0] = walk
      gaits[1] = trot
      gaits[2] = canter

      // console.log(string_data)
      // need to get data to public in tsv format w/headers
      // 
      // console.log(data)

      res.render('processed', {string_data: string_data, gaits: gaits})
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