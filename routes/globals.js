var async = require('async');

var Event = require('../models/main.js').Event;
var Exhibit = require('../models/main.js').Exhibit;


exports.search = function(req, res) {
	var search = req.body.search;

	Exhibit.find({ $text: { $search: search } }, { score : { $meta: 'textScore' } }).sort({ score : { $meta : 'textScore' } }).select('title _id').exec(function(err, exhibits) {
		Event.find({ $text: { $search: search } }, { score : { $meta: 'textScore' } }).sort({ score : { $meta : 'textScore' } }).select('title _id').exec(function(err, events) {
			res.send({events: events, exhibits: exhibits});
		});
	});
}


exports.locale = function(req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect('back');
}