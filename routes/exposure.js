var Exhibit = require('../models/main.js').Exhibit;

exports.index = function(req, res) {
	Exhibit.find().exec(function(err, exhibits) {
		res.render('exposure', {exhibits: exhibits});
	});
}