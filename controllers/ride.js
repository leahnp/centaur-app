var fs = require("fs");
var child = require('child_process');
var moment = require('moment');

var IndexController = {
  // returns list of all rides in user history
  index: function(req, res, next) {
    fs.readdir('data', function(err, files) {
      if (err) {
        return next(err)
      }
      var rides = [];
      for (var file of files) {
        if (file.includes(".dat")) {
          rides.push(file.replace(/_/g," ").replace(/x/g, ',').replace(/.dat/g, ''))
          // rides.push(file.replace(/_/g," ").replace(/x/g, ','))
        }
      }
      res.render('ride', {rides: rides})
    })
  },

  // test processing data
  test_view: function(req, res, next) {
    // start python process
    var process = child.execFile('python', ['test.py'], {maxBuffer : 500 * 1024}, function (err, stdout, stderr) {
      if (err) return next(err);
      // console.log(stdout);
      // console.log(stderr);
      var string_data = stdout + stderr;
      // var data = JSON.parse(stdout);

      res.render('processed', {string_data: string_data})
    });
  },

  // process data, return info to display with D3
  view: function(req, res, next) {
    var filename = req.params.id.replace(/ /g,"_").replace(/,/g, 'x') + ".dat"
    var filepath = "data/" + filename;

    // read data from file
    var filestream = fs.createReadStream(filepath);

    // start python process
    var process = child.execFile('python', ['oracle/predict.py'], {maxBuffer : 500 * 1024}, function (err, stdout, stderr) {
      if (err) return next(err);
      // console.log(stdout);
      // console.log(stderr);
      var string_data = stdout;
      // var data = JSON.parse(stdout);
      var walk = 0;
      var trot = 0;
      var canter = 0;
      var total_time = 0;
      var gaits = [0, 0, 0];

      // count occurances of walk, trot, canter
      for (var array of JSON.parse(string_data)) {
        total_time = array[0];

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
      var total_time = Math.round(total_time / 60)

      res.render('processed', {string_data: string_data, gaits: gaits, total_time: total_time})
    });
    // write data from file to python process's stdin
    filestream.pipe(process.stdin);
  },

  // save data after ride
  save: function(req, res, next) {
    // get date for file name
    var date = moment().format('MMMM Do YYYY, h:mm:ss a');

    var data = req.body.data;
    // list of x, y, z accel values
    var output = "";
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      output += row[0] + " " + row[1] + " " + row[2] + " " + row[3] +"\n";
    }

    // generate unique file name
    var splitOutput = output.split(' ') 
    // old file naming convention
    // var filename = "user-" + parseInt(splitOutput[0]) + ".dat"
    // new file naming convention
    var filename = date.replace(/ /g,"_").replace(/,/g, 'x') + ".dat"
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