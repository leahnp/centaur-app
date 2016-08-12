// var Books = require("../models/books_model");


var IndexController = {

	uploadData: function(req, res) {
		console.log(req.body.undefined)
		var path = require('path');
		var fs = require("fs");
		var path_ = __dirname + "/data/test.dat";
		// var path_ = path.join("../data/", 'output', 'test.txt');
		var data = req.body;

		// helper.write = function(data,filename){
		//   if(typeof data !== "string") data = JSON.stringify(data);
		//   var file = path.join(__dirname, 'output', filename);
		//   fs.writeFileSync(file, data);
		// };

		fs.writeFile(path_, data, function(error) {
		     if (error) {
		       console.error("write error:  " + error.message);
		     } else {
		     		console.log('incallback')
		       res.redirect('/capture1')
		     }
		});
	}

	// startCapture: function(req, res) {
	//     // window.ondevicemotion = function(event) {  
	//     //   var accelerationX = event.accelerationIncludingGravity.x;  
	//     //   var accelerationY = event.accelerationIncludingGravity.y;  
	//     //   var accelerationZ = event.accelerationIncludingGravity.z;  
	//     // }  

	// 	media.remove(req.params.id, function(error) {
	// 		if(error=="Could not add to db") {
	// 			res.status(404).send(error)
	// 		} else if (error) {
	// 			// var err = "Please try again"
	// 			res.status(500).send(error)
	// 		} else {
	// 			console.log("final else")
	// 			res.redirect('/' + req.body.media)
	// 		}
	// 	})
	// }
}



module.exports = IndexController