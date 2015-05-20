'use strict';

module.exports = function (app) {
  //google seo
  app.use(function (req, res, next) {
    var fragment = req.query._escaped_fragmnt_;
    if (!fragment) return next();
    try {
      logger.info('req.originalUrl', req.originalUrl);
      // this solution only works when hashbang is used

      var fullURL = req.originalUrl.split('?')[0];
      logger.info('in google crawling', fullURL);
      Browser.visit(fullURL, browserOpts, function(e, browser, status){
        var html = browser.html();
        res.send(html);
      });
    } catch (err) {
      res.send(404);
    }
  });

  // pages route
  app.use('/', function (req, res) {
    res.render('pages/index');
  });
}