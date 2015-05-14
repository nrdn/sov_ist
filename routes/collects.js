var Collect = require('../models/main.js').Collect;

exports.index = function(req, res) {
	Collect.find().exec(function(err, collects) {
		res.render('collects', {collects: collects});
	});
}