var Event = require('../models/main.js').Event;

function mirrorSort(arr) {
	var result = [];
	for (var i = 0; i <= arr.length; i++) {
			if (arr.length == result.length) break;
			var chunk = arr.splice(0, 3);
			result = result.concat(chunk.reverse());
	}
	return result;
}


exports.index = function(req, res) {
	News.find().sort('-date').limit(5).exec(function(err, news) {
		Event.find().sort('-date').limit(6).exec(function(err, events) {
			var result = mirrorSort(events);
			res.render('main', {events: result, news: news});
		});
	});
}