// var Books = require("../models/books_model");


var IndexController = {

	startCapture: function(req, res) {
	    window.ondevicemotion = function(event) {  
	      var accelerationX = event.accelerationIncludingGravity.x;  
	      var accelerationY = event.accelerationIncludingGravity.y;  
	      var accelerationZ = event.accelerationIncludingGravity.z;  
	    }  

		media.remove(req.params.id, function(error) {
			if(error=="Could not add to db") {
				res.status(404).send(error)
			} else if (error) {
				// var err = "Please try again"
				res.status(500).send(error)
			} else {
				console.log("final else")
				res.redirect('/' + req.body.media)
			}
		})
	}
}



module.exports = IndexController