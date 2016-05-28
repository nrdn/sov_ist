var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });
var del = require('del');

var Banner = require('../../models/main.js').Banner;

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
// *** Admin Banners Block ***
// ------------------------


exports.list = function(req, res) {
	Banner.find().sort('num').exec(function(err, banners) {
		res.render('auth/banners/', {banners: banners});
	});
}


// ------------------------
// *** Add Banner Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/banners/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;

	var banner = new Banner();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {

		checkNested(post, [locale, 'title'])
			&& banner.setPropertyLocalised('title', post[locale].title, locale);

	});
	banner.num = post.num;
	banner.link = post.link;
	banner.top = post.top;
	banner.html = post.html;
	banner.code = post.code;

	if (!files.image) {
		return (function () {
			banner.save(function(err, banner) {
				res.redirect('back');
			});
		})();
	}

	fs.mkdir(__appdir + '/public/images/banners/' + banner._id, function() {
		var newPath = __appdir + '/public/images/banners/' + banner._id;;
		gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
			gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
				banner.path.original = '/images/banners/' + banner._id + '/original.jpg';
				banner.path.thumb = '/images/banners/' + banner._id + '/thumb.jpg';
				banner.save(function() {
					res.redirect('/auth/banners');
				});
			});
		});
	});

}


// ------------------------
// *** Edit Banner Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Banner.findById(id).exec(function(err, banner) {
		res.render('auth/banners/edit.jade', {banner: banner});
	});
}

exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;
	var files = req.files;

	Banner.findById(id).exec(function(err, banner) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {

			checkNested(post, [locale, 'title'])
				&& banner.setPropertyLocalised('title', post[locale].title, locale);

		});

		banner.num = post.num;
		banner.link = post.link;
		banner.top = post.top;
		banner.html = post.html;
		banner.code = post.code;

		if (!files.image) {
			return (function () {
				banner.save(function(err, banner) {
					res.redirect('back');
				});
			})();
		}

		fs.mkdir(__appdir + '/public/images/banners/' + banner._id, function() {
			var newPath = __appdir + '/public/images/banners/' + banner._id;;
			gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
				gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
					banner.path.original = '/images/banners/' + banner._id + '/original.jpg';
					banner.path.thumb = '/images/banners/' + banner._id + '/thumb.jpg';
					banner.save(function() {
						res.redirect('/auth/banners');
					});
				});
			});
		});

	});
}


// ------------------------
// *** Remove Banner Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Banner.findByIdAndRemove(id, function() {
		del.sync(__appdir + '/public/images/banners/' + id);
		res.send('ok');
	});
}