var jade = require('jade');
var path = require('path');
var __appdir = path.dirname(require.main.filename);

var Officials = require('../models/main.js').Officials;


// ------------------------
// *** officials Block ***
// ------------------------


exports.index = function(req, res) {
  Officials.where('status').ne('hidden').limit(12).sort('-date').exec(function(err, officials) {
    res.render('officials', {officials: officials});
  });
}

exports.officials = function(req, res) {
  var id = req.params.id;

  Officials.findById(id).exec(function(err, officials) {
    res.render('officials/officials.jade', {officials: officials});
  });
}


exports.get_officials = function(req, res) {
  var post = req.body;

  Officials.where('status').ne('hidden').sort('-date').skip(post.skip).limit(post.limit).exec(function(err, officials) {
    if (officials.length > 0) {
      var data = jade.renderFile(__appdir + '/views/officials/get_officials.jade', {officials: officials});
      res.send(data);
    } else {
      res.send('out');
    }
  });
}