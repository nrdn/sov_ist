var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');
var mv = require('mv');
var del = require('del');

var Official = require('../../models/main.js').Official;

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
// *** Admin Officials Block ***
// ------------------------


exports.list = function(req, res) {
	Official.find().sort('num').exec(function(err, officials) {
		res.render('auth/officials/', {officials: officials});
	});
}


// ------------------------
// *** Add Officials Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/officials/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;

	var official = new Official();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {

		checkNested(post, [locale, 'title'])
			&& official.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'position'])
			&& official.setPropertyLocalised('position', post[locale].position, locale);

	});
	official.num = post.num;

	console.log(official);
	console.log(files.doc);


	if (!files.doc) {
		return (function () {
			official.save(function(err, official) {
				res.redirect('back');
			});
		})();
	}

	else {
		mv(files.doc.path, __appdir + '/public/files/officials/' + files.doc.name , function(err) {
	  	if(err) {
				return console.log(err);
		  }
			console.log("The file was saved!");
				official.path = '/files/officials/' + files.doc.name;

		    official.save(function() {
					res.redirect('/auth/officials');
			});

		});
	}

}


// ------------------------
// *** Edit Official Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Official.findById(id).exec(function(err, official) {
		res.render('auth/officials/edit.jade', {official: official});
	});
}

exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;
	var files = req.files;

	Official.findById(id).exec(function(err, official) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {

			checkNested(post, [locale, 'title'])
				&& official.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'position'])
				&& official.setPropertyLocalised('position', post[locale].position, locale);
		});

		official.num = post.num;

		if (!files.doc) {
			return (function () {
				official.save(function(err, official) {
					res.redirect('back');
				});
			})();
		}

		else {
			mv(files.doc.path, __appdir + '/public/files/officials/' + files.doc.name , function(err) {
		  	if(err) {
					return console.log(err);
			  }
				console.log("The file was saved!");
					official.path = '/files/officials/' + files.doc.name;

			    official.save(function() {
						res.redirect('/auth/officials');
				});

			});
		}

	});
}


// ------------------------
// *** Remove Official Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Official.findByIdAndRemove(id, function() {
		del.sync(__appdir + '/public/images/officials/' + id);
		res.send('ok');
	});
}