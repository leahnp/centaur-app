var fs = require("fs");

var IndexController = {
  uploadData: function(req, res) {
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
    // path is relative to cwd
    // console.log(process.cwd());
    var filepath = "data/" + filename;


    fs.writeFile(filepath, output, function(error) {
       if (error) {  
         console.error("write error:  " + error.message);
         return;
       }

       res.sendStatus(200);
    });
  }
}



module.exports = IndexController