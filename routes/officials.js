var jade = require('jade');
var path = require('path');
var __appdir = path.dirname(require.main.filename);

var Official = require('../models/main.js').Official;


// ------------------------
// *** Official Block ***
// ------------------------


exports.index = function(req, res) {
  Official.where('title.lg').equals(req.locale).limit(20).sort('num').exec(function(err, officials) {
    res.render('officials', {officials: officials});
  });
}

exports.get_officials = function(req, res) {
  var post = req.body;

  Official.where('title.lg').equals(req.locale).sort('num').skip(post.skip).limit(post.limit).exec(function(err, officials) {
    if (officials.length > 0) {
      res.send(jade.renderFile(__appdir + '/views/officials/get_officials.jade', {officials: officials, locale: req.locale}));
    } else {
      res.send('out');
    }
  });
}