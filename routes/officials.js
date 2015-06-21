var jade = require('jade');
var path = require('path');
var __appdir = path.dirname(require.main.filename);

var Officials = require('../models/main.js').Officials;


// ------------------------
// *** officials Block ***
// ------------------------


exports.index = function(req, res) {
  Officials.where('title.lg').equals(req.locale).where('status').ne('hidden').limit(12).sort('-date').exec(function(err, officials) {
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

  Officials.where('title.lg').equals(req.locale).where('status').ne('hidden').sort('-date').skip(post.skip).limit(post.limit).exec(function(err, officials) {
    if (officials.length > 0) {
      res.send(jade.renderFile(__appdir + '/views/officials/get_officials.jade', {officials: officials, locale: req.locale}));
    } else {
      res.send('out');
    }
  });
}