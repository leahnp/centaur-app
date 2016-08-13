var fs = require("fs");

var IndexController = {
  uploadData: function(req, res) {
    // path is relative to cwd
    // console.log(process.cwd());
    var filename = "data/test.dat";
    var data = req.body;

    // convert javascript array to space delimeted
    // list of x, y, z accel values
    var output = "";
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      output += row[0] + " " + row[1] + " " + row[2] + "\n";
    }

    fs.writeFile(filename, output, function(error) {
       if (error) {  
         console.error("write error:  " + error.message);
         return;
       }

       res.sendStatus(200);
    });
  }

  // startCapture: function(req, res) {
  //     // window.ondevicemotion = function(event) {  
  //     //   var accelerationX = event.accelerationIncludingGravity.x;  
  //     //   var accelerationY = event.accelerationIncludingGravity.y;  
  //     //   var accelerationZ = event.accelerationIncludingGravity.z;  
  //     // }  

  //  media.remove(req.params.id, function(error) {
  //    if(error=="Could not add to db") {
  //      res.status(404).send(error)
  //    } else if (error) {
  //      // var err = "Please try again"
  //      res.status(500).send(error)
  //    } else {
  //      console.log("final else")
  //      res.redirect('/' + req.body.media)
  //    }
  //  })
  // }
}



module.exports = IndexController