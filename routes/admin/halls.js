var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });

var Hall = require('../../models/main.js').Hall;
var Subsidiary = require('../../models/main.js').Subsidiary;

var __appdir = path.dirname(require.main.filename);


// ------------------------
// *** Handlers Block ***
// ------------------------


var checkNested = function (obj, layers) {

	if (typeof layers == 'string') {
		layers = layers.split('.');
	}

	for (var i = 0; i < layers.length; i++) {
		if (!obj || !obj.hasOwnProperty(layers[i])) {
			return false;
		}
		obj = obj[layers[i]];
	}
	return true;
}


// ------------------------
// *** Admin Halls Block ***
// ------------------------


exports.list = function(req, res) {
	Hall.find().exec(function(err, halls) {
		res.render('auth/halls/', {halls: halls});
	});
}


// ------------------------
// *** Add Halls Block ***
// ------------------------


exports.add = function(req, res) {
	Subsidiary.find().exec(function(err, subsidiarys) {
		res.render('auth/halls/add.jade', {subsidiarys: subsidiarys});
	});
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var images = [];

	var hall = new Hall();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& hall.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'description'])
			&& hall.setPropertyLocalised('description', post[locale].description, locale);
	});

	hall.subsidiary = post.subsidiary;


	if (!post.images) {
		return (function () {
			hall.images = [];
			hall.save(function(err, hall) {
				res.redirect('back');
			});
		})();
	}

	var public_path = __appdir + '/public';

	var images_path = {
		original: '/images/halls/' + hall._id + '/original/',
		thumb: '/images/halls/' + hall._id + '/thumb/',
	}

	mkdirp.sync(public_path + images_path.original);
	mkdirp.sync(public_path + images_path.thumb);

	post.images.path.forEach(function(item, i) {
		images.push({
			path: post.images.path[i]
		});
	});

	async.forEachSeries(images, function(image, callback) {
		var name = Date.now();
		var original_path = images_path.original + name + '.jpg';
		var thumb_path = images_path.thumb + name + '.jpg';

		gm(public_path + image.path).resize(false, 140).write(public_path + thumb_path, function() {
			gm(public_path + image.path).resize(1000, false).write(public_path + original_path, function() {
				hall.images.push({
					original: original_path,
					thumb: thumb_path,
				});
				callback();
			});
		});
	}, function() {
		hall.save(function(hall) {
			res.redirect('back');
		});
	});

}


// ------------------------
// *** Edit Halls Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Hall.findById(id).exec(function(err, hall) {
		Subsidiary.find().exec(function(err, subsidiarys) {
			res.render('auth/halls/edit.jade', {hall: hall, subsidiarys: subsidiarys});
		});
	});
}

exports.edit_form = function(req, res) {
	var post = req.body;
	var id = req.params.id;

	Hall.findById(id).exec(function(err, hall) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& hall.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& hall.setPropertyLocalised('description', post[locale].description, locale);
		});

		hall.subsidiary = post.subsidiary;

		hall.save(function(err, hall) {
			res.redirect('/auth/halls');
		});
	});
}


// ------------------------
// *** Remove Events Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Hall.findByIdAndRemove(id, function() {
		// deleteFolderRecursive(__dirname + '/public/images/events/' + id);
		res.send('ok');
	});
}