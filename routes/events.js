var Event = require('../models/main.js').Event;
var Subsidiary = require('../models/main.js').Subsidiary;
var Category = require('../models/main.js').Category;

exports.index = function(req, res) {
	Event.find({type: req.params.type}).sort('-date').exec(function(err, events) {
		Category.find().exec(function(err, categorys) {
			Subsidiary.find().exec(function(err, subsidiarys) {
				res.render('events', {type: req.params.type, events: events, categorys: categorys, subsidiarys: subsidiarys});
			});
		});
	});
}