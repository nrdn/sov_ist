var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });
var del = require('del');

var Special = require('../../models/main.js').Special;

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
// *** Admin Specials Block ***
// ------------------------


exports.list = function(req, res) {
	Special.find().sort('num').exec(function(err, specials) {
		res.render('auth/specials/', {specials: specials});
	});
}


// ------------------------
// *** Add Special Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/specials/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;

	var special = new Special();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {

		checkNested(post, [locale, 'title'])
			&& special.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'subtitle'])
			&& special.setPropertyLocalised('subtitle', post[locale].subtitle, locale);

		checkNested(post, [locale, 'description'])
			&& special.setPropertyLocalised('description', post[locale].description, locale);

	});

	special.url = post.url;
	special.num = post.num;

	if (!files.image) {
		return (function () {
			special.save(function(err, special) {
				res.redirect('back');
			});
		})();
	}

	fs.mkdir(__appdir + '/public/images/specials/' + special._id, function() {
		var newPath = __appdir + '/public/images/specials/' + special._id;;
		gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
			gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
				special.path.original = '/images/specials/' + special._id + '/original.jpg';
				special.path.thumb = '/images/specials/' + special._id + '/thumb.jpg';
				special.save(function() {
					res.redirect('/auth/specials');
				});
			});
		});
	});

}


// ------------------------
// *** Edit Special Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Special.findById(id).exec(function(err, special) {
		res.render('auth/specials/edit.jade', {special: special});
	});
}

exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;
	var files = req.files;

	Special.findById(id).exec(function(err, special) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {

			checkNested(post, [locale, 'title'])
				&& special.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'subtitle'])
				&& special.setPropertyLocalised('subtitle', post[locale].subtitle, locale);

			checkNested(post, [locale, 'description'])
				&& special.setPropertyLocalised('description', post[locale].description, locale);

		});

		special.url = post.url;
		special.num = post.num;

		if (!files.image) {
			return (function () {
				special.save(function(err, special) {
					res.redirect('back');
				});
			})();
		}

		fs.mkdir(__appdir + '/public/images/specials/' + special._id, function() {
			var newPath = __appdir + '/public/images/specials/' + special._id;;
			gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
				gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
					special.path.original = '/images/specials/' + special._id + '/original.jpg';
					special.path.thumb = '/images/specials/' + special._id + '/thumb.jpg';
					special.save(function() {
						res.redirect('/auth/specials');
					});
				});
			});
		});

	});
}


// ------------------------
// *** Remove Special Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Special.findByIdAndRemove(id, function() {
		del.sync(__appdir + '/public/images/specials/' + id);
		res.send('ok');
	});
}