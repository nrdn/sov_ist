var path = require('path');
var jade = require('jade');

var Event = require('../models/main.js').Event;
var News = require('../models/main.js').News;
var Category = require('../models/main.js').Category;

var __appdir = path.dirname(require.main.filename);


exports.index = function(req, res) {
	News.find().nor([{'status': 'hidden'}, {'status': 'out'}]).sort('-date').limit(5).exec(function(err, news) {
		Event.find().nor([{'status': 'hidden'}, {'status': 'out'}]).sort('-date').limit(12).exec(function(err, events) {
			Category.where('status').equals('main').exec(function(err, categorys) {
				res.render('main', {events: events, news: news, categorys: categorys});
			});
		});
	});
}


exports.get_events = function(req, res) {
	var post = req.body;

	if (post.context.categorys && post.context.types) {
		var Query = Event.find({'type': {'$in': post.context.types}, 'categorys': {'$in': post.context.categorys}});
	} else if (post.context.categorys && !post.context.types) {
		var Query = Event.find({'categorys': {'$in': post.context.categorys} });
	} else if (!post.context.categorys && post.context.types) {
		var Query = Event.find({'type': {'$in': post.context.types} });
	} else {
		var Query = Event.find();
	}

	// var Query = post.context.categorys || post.context.types
	// 	// ? Event.find().or([{ 'categorys': {'$in': post.context.categorys || []} }, { 'type': {'$in': post.context.types || []} }])
	// 	? Event.find({'type': {'$in': post.context.types}, 'categorys': {'$in': post.context.categorys}})
	// 	: Event.find();

	Query.nor([{'status': 'hidden'}, {'status': 'out'}]).sort('-date').skip(post.skip).limit(post.limit).exec(function(err, events) {
		var opts = {events: events, compileDebug: false, debug: false, cache: true, pretty: false};
		events.length > 0
			? res.send(jade.renderFile(__appdir + '/views/events/get_events.jade', opts))
			: res.send('out');
	});
}