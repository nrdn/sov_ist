var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
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
			path: post.images.path[i],
			description: post.images.description[i]
		});
	});

	async.forEachSeries(images, function(image, callback) {
		var name = new Date();
		name = name.getTime();
		var original_path = images_path.original + name + '.jpg';
		var thumb_path = images_path.thumb + name + '.jpg';

		gm(public_path + image.path).resize(300, false).write(public_path + thumb_path, function() {
			gm(public_path + image.path).write(public_path + original_path, function() {
				hall.images.push({
					original: original_path,
					thumb: thumb_path,
					description: [{
						lg: 'ru',
						value: image.description
					}]
				});
				callback();
			});
		});
	}, function() {
		hall.save(function() {
			res.redirect('/auth/halls');
		});
	});

}


// ------------------------
// *** Edit Halls Block ***
// ------------------------


exports.edit = function(req, res) {
  var id = req.params.id;
  var public_path = __appdir + '/public';
  var preview_path = '/images/preview/';
  var images_preview = [];


	Subsidiary.find().exec(function(err, subsidiarys) {
		Hall.findById(id).exec(function(err, hall) {
			async.forEach(hall.images, function(image, callback) {
				var image_path = __appdir + '/public' + image.original;
				var image_name = image.original.split('/')[5];
				fs.createReadStream(image_path).pipe(fs.createWriteStream(public_path + preview_path + image_name));
				images_preview.push(preview_path + image_name);
				callback();
			}, function() {
				res.render('auth/halls/edit.jade', {images_preview: images_preview, hall: hall, subsidiarys: subsidiarys});
			});
		});
	});

}

exports.edit_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var id = req.params.id;
	var images = [];

	Hall.findById(id).exec(function(err, hall) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& hall.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& hall.setPropertyLocalised('description', post[locale].description, locale);
		});

		hall.subsidiary = post.subsidiary;

		var public_path = __appdir + '/public';

		var images_path = {
			original: '/images/halls/' + hall._id + '/original/',
			thumb: '/images/halls/' + hall._id + '/thumb/',
		}

		del.sync([public_path + images_path.original, public_path + images_path.thumb]);

		if (!post.images) {
			return (function () {
				hall.images = [];
				hall.save(function() {
					res.redirect('back');
				});
			})();
		}

		mkdirp.sync(public_path + images_path.original);
		mkdirp.sync(public_path + images_path.thumb);

		hall.images = [];

		post.images.path.forEach(function(item, i) {
			images.push({
				path: post.images.path[i],
				description: post.images.description[i]
			});
		});

		async.forEachSeries(images, function(image, callback) {
			var name = new Date();
			name = name.getTime();
			var original_path = images_path.original + name + '.jpg';
			var thumb_path = images_path.thumb + name + '.jpg';

			gm(public_path + image.path).resize(300, false).write(public_path + thumb_path, function() {
				gm(public_path + image.path).write(public_path + original_path, function() {
					hall.images.push({
						original: original_path,
						thumb: thumb_path,
						description: [{
							lg: 'ru',
							value: image.description
						}]
					});
					callback();
				});
			});
		}, function() {
			hall.save(function() {
				res.redirect('/auth/halls');
			})
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