var jade = require('jade');
var path = require('path');
var __appdir = path.dirname(require.main.filename);

var Team = require('../models/main.js').Team;


// ------------------------
// *** Team Block ***
// ------------------------


exports.index = function(req, res) {
  Team.where('title.lg').equals(req.locale).limit(12).sort('-date').exec(function(err, teams) {
    res.render('teams', {teams: teams});
  });
}

exports.team = function(req, res) {
  var id = req.params.id;

  Team.findById(id).exec(function(err, team) {
    res.render('teams/team.jade', {team: team});
  });
}


exports.get_teams = function(req, res) {
  var post = req.body;

  Team.where('title.lg').equals(req.locale).sort('-date').skip(post.skip).limit(post.limit).exec(function(err, teams) {
    if (teams.length > 0) {
      res.send(jade.renderFile(__appdir + '/views/teams/get_teams.jade', {teams: teams, locale: req.locale}));
    } else {
      res.send('out');
    }
  });
}