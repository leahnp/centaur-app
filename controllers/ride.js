var fs = require("fs");
var rides = []

var IndexController = {
  saveData: function(req, res) {
    var data = req.body.data;


    // convert javascript array to space delimeted
    // list of x, y, z accel values
    var output = "";
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      output += row[0] + " " + row[1] + " " + row[2] + " " + row[3] +"\n";
    }

  
    // generate unique file name
    var splitOutput = output.split(' ')
    // var filename = req.body.type + "-" + parseInt(splitOutput[0] + ".dat") 
    var filename = req.body.type + "-" + parseInt(splitOutput[0]) + ".dat"
    // path is relative to cwd
    // console.log(process.cwd());
    var filepath = "oracle/predict_raww/" + filename;

    rides.push(filename)

    fs.writeFile(filepath, output, function(error) {
       if (error) {  
         console.error("write error:  " + error.message);
         return;
       } 
      res.status(200).json({whatevs: 'it works!!!!'})
        
       // run python script, pass data?
    });
  },

  processData: function(req, res) {
    var spawn = require('child_process').spawn,
    py    = spawn('python', ['../oracle/predict.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

  },

  showRidesData: function(req, res) {
    res.render('rides', {rides: rides})

  }
}



module.exports = IndexController