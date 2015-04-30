var Collect = require('../../models/main.js').Collect;


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
// *** Admin Collects Block ***
// ------------------------


exports.list = function(req, res) {
	Collect.find().sort('-date').exec(function(err, collects) {
		res.render('auth/collects/', {collects: collects});
	});
}


// ------------------------
// *** Add Collects Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/collects/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;

	var collect = new Collect();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& collect.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'description'])
			&& collect.setPropertyLocalised('description', post[locale].description, locale);

	});

	collect.save(function(err, collect) {
		res.redirect('back');
	});
}


// ------------------------
// *** Edit Collects Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Collect.findById(id).exec(function(err, collect) {
		res.render('auth/collects/edit.jade', {collect: collect});
	});
}


exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;


	Collect.findById(id).exec(function(err, collect) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& collect.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& collect.setPropertyLocalised('description', post[locale].description, locale);

		});

		collect.save(function(err, collect) {
			res.redirect('back');
		});
	});
}


// ------------------------
// *** Remove Collects Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Collect.findByIdAndRemove(id, function() {
		// deleteFolderRecursive(__dirname + '/public/images/events/' + id);
		res.send('ok');
	});
}