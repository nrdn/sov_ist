var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });
var del = require('del');

var Team = require('../../models/main.js').Team;

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
// *** Admin Teams Block ***
// ------------------------


exports.list = function(req, res) {
	Team.find().sort('num').exec(function(err, teams) {
		res.render('auth/teams/', {teams: teams});
	});
}


// ------------------------
// *** Add Team Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/teams/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var images = [];

	var team = new Team();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {

		checkNested(post, [locale, 'title'])
			&& team.setPropertyLocalised('title', post[locale].title, locale);
	});

	team.url = post.url;
	team.num = post.num;

	if (!files.image) {
		return (function () {
			team.images = [];
			team.save(function(err, team) {
				res.redirect('back');
			});
		})();
	}


	if (!post.images) {
		return (function () {

			team.save(function(err, team) {
				res.redirect('back');
			});
		})();
	}

	var public_path = __appdir + '/public';

	var images_path = {
		original: '/images/teams/' + team._id + '/original/',
		thumb: '/images/teams/' + team._id + '/thumb/',
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
				image_obj.title = [{
					lg: 'ru',
					value: image.description.ru
				}]
				if (image.title.en) {
					image_obj.description.push({
						lg: 'en',
						value: image.description.en
					})
				}
				team.images.push(image_obj);
				callback();
			});
		});
	}, function() {
		team.save(function() {
			res.redirect('/auth/teams');
		});
	});



	fs.mkdir(__appdir + '/public/images/teams/' + team._id, function() {
		var newPath = __appdir + '/public/images/teams/' + team._id;;
		gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
			gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
				team.path.original = '/images/teams/' + team._id + '/logo.jpg';
				team.path.thumb = '/images/teams/' + team._id + '/thumb.jpg';
				team.save(function() {
					res.redirect('/auth/teams');
				});
			});
		});
	});

}


// ------------------------
// *** Edit Team Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Team.findById(id).exec(function(err, team) {
		res.render('auth/teams/edit.jade', {team: team});
	});
}

exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;
	var files = req.files;

	Team.findById(id).exec(function(err, team) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {

			checkNested(post, [locale, 'title'])
				&& team.setPropertyLocalised('title', post[locale].title, locale);
		});

		team.url = post.url;
		team.num = post.num;

		if (!files.image) {
			return (function () {
				team.save(function(err, team) {
					res.redirect('back');
				});
			})();
		}

		fs.mkdir(__appdir + '/public/images/teams/' + team._id, function() {
			var newPath = __appdir + '/public/images/teams/' + team._id;;
			gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
				gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
					team.path.original = '/images/teams/' + team._id + '/logo.jpg';
					team.path.thumb = '/images/teams/' + team._id + '/thumb.jpg';
					team.save(function() {
						res.redirect('/auth/teams');
					});
				});
			});
		});

	});
}


// ------------------------
// *** Remove Team Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Team.findByIdAndRemove(id, function() {
		del.sync(__appdir + '/public/images/teams/' + id);
		res.send('ok');
	});
}