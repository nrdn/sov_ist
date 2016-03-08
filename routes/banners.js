var Banner = require('../models/main.js').Banner;

exports.index = function(req, res) {
  Banner.where('title.lg').equals(req.locale).limit(20).sort('num').exec(function(err, banners) {
    res.render('banners', {banners: banners});
  });
}

exports.banner = function(req, res) {
	var id = req.params.id;

	Exhibit.find({'banner': id}).where('title.lg').equals(req.locale).exec(function(err, banners) {
		Collect.findById(id).exec(function(err, collect) {
			res.render('banners/banner.jade', {banner: banner});
		});
	});
}



