var jade = require('jade');
var path = require('path');
var async = require('async');

var Event = require('../models/main.js').Event;
var Subsidiary = require('../models/main.js').Subsidiary;
var Category = require('../models/main.js').Category;

var __appdir = path.dirname(require.main.filename);


exports.index = function(req, res) {
	Event.find({type: req.params.type}).where('status').ne('hidden').sort('-date').limit(12).populate('subsidiary').exec(function(err, events) {
		Event.distinct('categorys', {type: req.params.type}).exec(function(err, categorys) {
			Category.where('_id').in(categorys).exec(function(err, categorys) {
				Subsidiary.find().exec(function(err, subsidiarys) {
					res.render('events', {type: req.params.type, events: events, categorys: categorys, subsidiarys: subsidiarys});
				});
			});
		});
	});
}


exports.event = function(req, res) {
	var id = req.params.id;
	Event.findById(id).populate('subsidiary').exec(function(err, event) {
		res.render('events/event.jade', {event: event});
	});
}


exports.get_events = function(req, res) {
	var post = req.body;

	if (post.context.categorys && post.context.subsidiarys) {
		var Query = Event.find({'subsidiary': {'$in': post.context.subsidiarys}, 'categorys': {'$in': post.context.categorys}});
	} else if (post.context.categorys && !post.context.subsidiarys) {
		var Query = Event.find({'categorys': {'$in': post.context.categorys} });
	} else if (!post.context.categorys && post.context.subsidiarys) {
		var Query = Event.find({'subsidiary': {'$in': post.context.subsidiarys} });
	} else {
		var Query = Event.find();
	}

	// var Query = post.context.categorys || post.context.subsidiarys
	// 	? Event.find({'type': post.context.type}).or([{ 'categorys': {'$in': post.context.categorys || []} }, { 'subsidiary': {'$in': post.context.subsidiarys || []} }])
	// 	: Event.find({'type': post.context.type});

	Query.where('status').ne('hidden').sort('-date').skip(post.skip).limit(post.limit).populate('subsidiary').exec(function(err, events) {
		var opts = {events: events, compileDebug: false, debug: false, cache: true, pretty: false};
		events.length > 0
			? res.send(jade.renderFile(__appdir + '/views/events/get_events.jade', opts))
			: res.send('out');
	});
}