var Event = require('../models/main.js').Event;

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
		res.render('events', {events: events});
	});
}