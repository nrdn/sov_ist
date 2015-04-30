var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });

var Exhibit = require('../../models/main.js').Exhibit;

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
// *** Admin Exhibits Block ***
// ------------------------


exports.list = function(req, res) {
  Exhibit.find().exec(function(err, exhibits) {
    res.render('auth/exhibits/', {exhibits: exhibits});
  });
}


// ------------------------
// *** Add Exhibits Block ***
// ------------------------


exports.add = function(req, res) {
  res.render('auth/exhibits/add.jade');
}

exports.add_form = function(req, res) {
  var post = req.body;
  var files = req.files;
  var images = [];

  var exhibit = new Exhibit();

  var locales = post.en ? ['ru', 'en'] : ['ru'];

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'title'])
      && exhibit.setPropertyLocalised('title', post[locale].title, locale);

    checkNested(post, [locale, 'description'])
      && exhibit.setPropertyLocalised('description', post[locale].description, locale);
  });


  if (!post.images) {
    return (function () {
      exhibit.images = [];
      exhibit.save(function(err, exhibit) {
        res.redirect('back');
      });
    })();
  }

  var public_path = __appdir + '/public';

  var images_path = {
    original: '/images/exhibits/' + exhibit._id + '/original/',
    thumb: '/images/exhibits/' + exhibit._id + '/thumb/',
  }

  mkdirp.sync(public_path + images_path.original);
  mkdirp.sync(public_path + images_path.thumb);

  post.images.path.forEach(function(item, i) {
    images.push({
      path: post.images.path[i]
    });
  });

  async.forEachSeries(images, function(image, callback) {
    var name = Date.now();
    var original_path = images_path.original + name + '.jpg';
    var thumb_path = images_path.thumb + name + '.jpg';

    gm(public_path + image.path).resize(false, 140).write(public_path + thumb_path, function() {
      gm(public_path + image.path).resize(1000, false).write(public_path + original_path, function() {
        exhibit.images.push({
          original: original_path,
          thumb: thumb_path,
        });
        callback();
      });
    });
  }, function() {
    exhibit.save(function(exhibit) {
      res.redirect('back');
    });
  });

}


// ------------------------
// *** Edit Exhibits Block ***
// ------------------------


exports.edit = function(req, res) {
  var id = req.params.id;

  Exhibit.findById(id).exec(function(err, exhibit) {
    res.render('auth/exhibits/edit.jade', {exhibit: exhibit});
  });
}

exports.edit_form = function(req, res) {
  var post = req.body;
  var id = req.params.id;

  Exhibit.findById(id).exec(function(err, exhibit) {

    var locales = post.en ? ['ru', 'en'] : ['ru'];

    locales.forEach(function(locale) {
      checkNested(post, [locale, 'title'])
        && exhibit.setPropertyLocalised('title', post[locale].title, locale);

      checkNested(post, [locale, 'description'])
        && exhibit.setPropertyLocalised('description', post[locale].description, locale);
    });


    exhibit.save(function(err, exhibit) {
      res.redirect('/auth/exhibits');
    });
  });
}


// ------------------------
// *** Remove Exhibits Block ***
// ------------------------


exports.remove = function(req, res) {
  var id = req.body.id;
  Exhibit.findByIdAndRemove(id, function() {
    // deleteFolderRecursive(__dirname + '/public/images/events/' + id);
    res.send('ok');
  });
}