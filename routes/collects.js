var Collect = require('../models/main.js').Collect;
var Exhibit = require('../models/main.js').Exhibit;

exports.index = function(req, res) {
	Collect.find().sort('-date').exec(function(err, collects) {
		res.render('collects', {collects: collects});
	});
}

exports.collect = function(req, res) {
	var id = req.params.id;

	Exhibit.find({'collect': id}).exec(function(err, exhibits) {
		Collect.findById(id).exec(function(err, collect) {
			res.render('collects/collect.jade', {exhibits: exhibits, collect: collect});
		});
	});
}