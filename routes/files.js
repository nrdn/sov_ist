exports.sitemap = function(req, res){
  res.sendfile('sitemap.xml',  {root: './public'});
}

exports.robots = function(req, res){
  res.sendfile('robots.txt',  {root: './public'});
}

exports.new2018 = function(req, res){
  res.sendfile('2018.html',  {root: './public'});
}