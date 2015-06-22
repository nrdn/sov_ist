var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });
var del = require('del');

var Officials = require('../../models/main.js').Officials;

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
// *** Admin officials Block ***
// ------------------------


exports.list = function(req, res) {
	Officials.find().sort('-date').exec(function(err, officials) {
		res.render('auth/officials/', {officials: officials});
	});
}


// ------------------------
// *** Add officials Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/officials/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var images = [];

	var officials = new Officials();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& officials.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'description'])
			&& officials.setPropertyLocalised('description', post[locale].description, locale);

	});


	officials.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date));
	officials.status = post.status;

	officials.videos = post.videos.filter(function(n){ return n != '' });


	if (!post.images) {
		return (function () {
			officials.images = [];
			officials.save(function(err, officials) {
				res.redirect('back');
			});
		})();
	}

	var public_path = __appdir + '/public';

	var images_path = {
		original: '/images/officials/' + officials._id + '/original/',
		thumb: '/images/officials/' + officials._id + '/thumb/',
	}

	mkdirp.sync(public_path + images_path.original);
	mkdirp.sync(public_path + images_path.thumb);

	post.images.path.forEach(function(item, i) {
		var image_obj = {};
		image_obj.path = post.images.path[i];
		image_obj.description = {ru:null, en:null};

		if (post.images.description.ru) {
			image_obj.description.ru = post.images.description.ru[i];
		}

		if (post.images.description.en) {
			image_obj.description.en = post.images.description.en[i];
		}

		images.push(image_obj);
	});

	async.forEachSeries(images, function(image, callback) {
		var name = new Date();
		name = name.getTime();
		var original_path = images_path.original + name + '.jpg';
		var thumb_path = images_path.thumb + name + '.jpg';

		gm(public_path + image.path).resize(520, false).write(public_path + thumb_path, function() {
			gm(public_path + image.path).write(public_path + original_path, function() {
				var image_obj = {};
				image_obj.original = original_path;
				image_obj.thumb = thumb_path;
				image_obj.description = [{
					lg: 'ru',
					value: image.description.ru
				}]
				if (image.description.en) {
					image_obj.description.push({
						lg: 'en',
						value: image.description.en
					})
				}
				officials.images.push(image_obj);
				callback();
			});
		});
	}, function() {
		officials.save(function() {
			res.redirect('/auth/officials');
		});
	});

}


// ------------------------
// *** Edit officials Block ***
// ------------------------


exports.edit = function(req, res) {
  var id = req.params.id;
  var public_path = __appdir + '/public';
  var preview_path = '/images/preview/';
  var images_preview = [];

	Officials.findById(id).exec(function(err, officials) {
		async.forEach(officials.images, function(image, callback) {
			var image_path = __appdir + '/public' + image.original;
			var image_name = image.original.split('/')[5];
			fs.createReadStream(image_path).pipe(fs.createWriteStream(public_path + preview_path + image_name));
			images_preview.push(preview_path + image_name);
			callback();
		}, function() {
			res.render('auth/officials/edit.jade', {images_preview: images_preview, officials: officials});
		});
	});
}


exports.edit_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var id = req.params.id;
	var images = [];


	Officials.findById(id).exec(function(err, officials) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& officials.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& officials.setPropertyLocalised('description', post[locale].description, locale);

		});


		officials.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date));
		officials.status = post.status;

		officials.videos = post.videos.filter(function(n){ return n != '' });


		var public_path = __appdir + '/public';

		var images_path = {
			original: '/images/officials/' + officials._id + '/original/',
			thumb: '/images/officials/' + officials._id + '/thumb/',
		}

		del.sync([public_path + images_path.original, public_path + images_path.thumb]);

		if (!post.images) {
			return (function () {
				officials.images = [];
				officials.save(function() {
					res.redirect('back');
				});
			})();
		}

		mkdirp.sync(public_path + images_path.original);
		mkdirp.sync(public_path + images_path.thumb);

		officials.images = [];

		post.images.path.forEach(function(item, i) {
			var image_obj = {};
			image_obj.path = post.images.path[i];
			image_obj.description = {ru:null, en:null};

			if (post.images.description.ru) {
				image_obj.description.ru = post.images.description.ru[i];
			}

			if (post.images.description.en) {
				image_obj.description.en = post.images.description.en[i];
			}

			images.push(image_obj);
		});

		async.forEachSeries(images, function(image, callback) {
			var name = new Date();
			name = name.getTime();
			var original_path = images_path.original + name + '.jpg';
			var thumb_path = images_path.thumb + name + '.jpg';

			gm(public_path + image.path).resize(520, false).write(public_path + thumb_path, function() {
				gm(public_path + image.path).write(public_path + original_path, function() {
					var image_obj = {};
					image_obj.original = original_path;
					image_obj.thumb = thumb_path;
					image_obj.description = [{
						lg: 'ru',
						value: image.description.ru
					}]
					if (image.description.en) {
						image_obj.description.push({
							lg: 'en',
							value: image.description.en
						})
					}
					officials.images.push(image_obj);
					callback();
				});
			});
		}, function() {
			officials.save(function() {
				res.redirect('back');
			})
		});


	});
}


// ------------------------
// *** Remove officials Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Officials.findByIdAndRemove(id, function() {
		del.sync(__appdir + '/public/images/officials/' + id);
		res.send('ok');
	});
}