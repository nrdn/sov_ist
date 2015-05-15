var Collect = require('../models/main.js').Collect;

exports.index = function(req, res) {
	Collect.find().sort('-date').exec(function(err, collects) {
		res.render('collects', {collects: collects});
	});
}

exports.collect = function(req, res) {
	var id = req.params.id;

	Collect.findById(id).exec(function(err, collect) {
		res.render('collects/collect.jade', {collect: collect});
	});
}