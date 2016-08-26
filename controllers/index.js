var fs = require("fs");

var IndexController = {
  uploadData: function(req, res, next) {
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
    var filename = req.body.type + "-" + parseInt(splitOutput[0] + ".dat") 
    // var filename = req.body.type + "-" + date + ".dat"
    // path is relative to cwd
    // console.log(process.cwd());
    var filepath = "data/" + filename;

    // count += 1

    fs.writeFile(filepath, output, function(err) {
       if (err) return next(err);

       res.sendStatus(200);
    });
  }
}



module.exports = IndexController