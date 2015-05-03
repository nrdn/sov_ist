var News = require('../../models/main.js').News;


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
// *** Admin News Block ***
// ------------------------


exports.list = function(req, res) {
	News.find().sort('-date').exec(function(err, news) {
		res.render('auth/news/', {news: news});
	});
}


// ------------------------
// *** Add News Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/news/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;

	var news = new News();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& news.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'description'])
			&& news.setPropertyLocalised('description', post[locale].description, locale);

	});

	news.save(function(err, news) {
		res.redirect('back');
	});
}


// ------------------------
// *** Edit News Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	News.findById(id).exec(function(err, news) {
		res.render('auth/news/edit.jade', {news: news});
	});
}


exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;


	News.findById(id).exec(function(err, news) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& news.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& news.setPropertyLocalised('description', post[locale].description, locale);

		});

		news.save(function(err, news) {
			res.redirect('back');
		});
	});
}


// ------------------------
// *** Remove News Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	News.findByIdAndRemove(id, function() {
		// deleteFolderRecursive(__dirname + '/public/images/events/' + id);
		res.send('ok');
	});
}