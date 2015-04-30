var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });

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
// *** Admin Subsidiarys Block ***
// ------------------------


exports.list = function(req, res) {
	Subsidiary.find().exec(function(err, subsidiarys) {
		res.render('auth/subsidiarys/', {subsidiarys: subsidiarys});
	});
}


// ------------------------
// *** Add Subsidiarys Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/subsidiarys/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var images = [];

	var subsidiary = new Subsidiary();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& subsidiary.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'adress'])
			&& subsidiary.setPropertyLocalised('adress', post[locale].adress, locale);

		checkNested(post, [locale, 'description'])
			&& subsidiary.setPropertyLocalised('description', post[locale].description, locale);
	});


	if (!post.images) {
		return (function () {
			subsidiary.images = [];
			subsidiary.save(function(err, subsidiary) {
				res.redirect('back');
			});
		})();
	}

	var public_path = __appdir + '/public';

	var images_path = {
		original: '/images/subsidiarys/' + subsidiary._id + '/original/',
		thumb: '/images/subsidiarys/' + subsidiary._id + '/thumb/',
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
				subsidiary.images.push({
					original: original_path,
					thumb: thumb_path,
				});
				callback();
			});
		});
	}, function() {
		subsidiary.save(function(subsidiary) {
			res.redirect('back');
		});
	});

}


// ------------------------
// *** Edit Subsidiarys Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Subsidiary.findById(id).exec(function(err, subsidiary) {
		res.render('auth/subsidiarys/edit.jade', {subsidiary: subsidiary});
	});
}

exports.edit_form = function(req, res) {
	var post = req.body;
	var id = req.params.id;

	Subsidiary.findById(id).exec(function(err, subsidiary) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& subsidiary.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'adress'])
				&& subsidiary.setPropertyLocalised('adress', post[locale].adress, locale);

			checkNested(post, [locale, 'description'])
				&& subsidiary.setPropertyLocalised('description', post[locale].description, locale);
		});


		subsidiary.save(function(err, subsidiary) {
			res.redirect('/auth/halls');
		});
	});
}


// ------------------------
// *** Remove Subsidiarys Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Subsidiary.findByIdAndRemove(id, function() {
		// deleteFolderRecursive(__dirname + '/public/images/events/' + id);
		res.send('ok');
	});
}