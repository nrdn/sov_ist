var path = require('path');
var jade = require('jade');

var Event = require('../models/main.js').Event;
var News = require('../models/main.js').News;

var __appdir = path.dirname(require.main.filename);


exports.index = function(req, res) {
	News.find().sort('-date').limit(5).exec(function(err, news) {
		Event.find().sort('-date').limit(6).exec(function(err, events) {
			res.render('main', {events: events, news: news});
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
			var result = jade.renderFile(__appdir + '/views/events/get_events.jade', {events: events});
			res.send(result);
		} else {
			res.send('out');
		}

	});
}