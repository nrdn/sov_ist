var Subsidiary = require('../models/main.js').Subsidiary;

exports.index = function(req, res) {
	Subsidiary.find().sort('-date').exec(function(err, subsidiarys) {
		res.render('subsidiarys', {subsidiarys: subsidiarys});
	});
}