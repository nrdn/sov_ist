exports.index = function(req, res) {
	Subsidiary.find().exec(function(err, subsidiarys) {
		res.render('subsidiarys', {subsidiarys: subsidiarys});
	});
}