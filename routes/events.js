var Event = require('../models/main.js').Event;
var Subsidiary = require('../models/main.js').Subsidiary;
var Category = require('../models/main.js').Category;

exports.index = function(req, res) {
	var query = {};
	switch(req.params.type) {
		case 'exhibitions':
			query = {'type': 'exhibition'}
		break;
		case 'lectures':
			query = {'type': 'lecture'}
		break;
		case 'tours':
			query = {'type': 'tour'}
		break;
		case 'actions':
			query = {'type': 'action'}
		break;
		case 'xii':
			query = {'type': 'xii'}
		break;
	}

	Event.find(query).sort('-date').exec(function(err, events) {
		Category.find().exec(function(err, categorys) {
			Subsidiary.find().exec(function(err, subsidiarys) {
				res.render('events', {events: events, categorys: categorys, subsidiarys: subsidiarys});
			});
		});
	});
}