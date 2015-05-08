var path = require('path');
var jade = require('jade');

var Event = require('../models/main.js').Event;
var News = require('../models/main.js').News;

var __appdir = path.dirname(require.main.filename);

function mirrorSort(arr) {
	var result = [];
	for (var i = 0; i <= arr.length; i++) {
			if (arr.length == result.length) break;
			var chunk = arr.splice(0, 3);
			result = result.concat(chunk.reverse());
	}
	return result;
}


exports.index = function(req, res) {
	News.find().sort('-date').limit(5).exec(function(err, news) {
		Event.find().sort('-date').limit(6).exec(function(err, events) {
			var result = mirrorSort(events);
			res.render('main', {events: result, news: news});
		});
	});
}

exports.get_events = function(req, res) {
	var post = req.body;

	var Query = post.context
		? Event.where('type').in(post.context)
		: Event.find();

	Query.sort('-date').skip(post.skip).limit(post.limit).exec(function(err, events) {
		if (events.length > 0) {
			// var mirror = mirrorSort(events);
			var result = jade.renderFile(__appdir + '/views/events/get_events.jade', {events: events});
			res.send(result);
		} else {
			res.send('out');
		}

	});
}