var jade = require('jade');
var path = require('path');

var Event = require('../models/main.js').Event;
var Subsidiary = require('../models/main.js').Subsidiary;
var Category = require('../models/main.js').Category;

var __appdir = path.dirname(require.main.filename);

exports.index = function(req, res) {
	Event.find({type: req.params.type}).sort('-date').exec(function(err, events) {
		Category.find().exec(function(err, categorys) {
			Subsidiary.find().exec(function(err, subsidiarys) {
				res.render('events', {type: req.params.type, events: events, categorys: categorys, subsidiarys: subsidiarys});
			});
		});
	});
}

exports.get_events = function(req, res) {
	var post = req.body;

	var Query = post.context.categorys || post.context.subsidiarys
		? Event.find({'type': post.context.type}).or([{ 'categorys': {'$in': post.context.categorys || []} }, { 'subsidiary': {'$in': post.context.subsidiarys || []} }])
		: Event.find({'type': post.context.type});

	Query.sort('-date').skip(post.skip).limit(post.limit).exec(function(err, events) {
		if (events.length > 0) {
			var result = jade.renderFile(__appdir + '/views/events/get_events.jade', {events: events});
			res.send(result);
		} else {
			res.send('out');
		}

	});
}