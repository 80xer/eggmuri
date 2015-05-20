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
  app.get('/', function (req, res) {
    res.render('pages/index');
  });

  app.get('/err', function(req,res,next){
    console.log('error');
    res.type('json');
    var err = new Error();
    err.status = 500;
    next(err);
  });

  //error handling
  app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
  });

  // handling 404 errors
  app.use(function errorHandler404 (err, req, res, next) {
    if(err.status !== 404) {
      return next(err);
    }
   
    console.log('error 404');
    res.send(err.message || '** no unicorns here **');
  });

  // handling 500 errors
  app.use(function errorHandler500 (err, req, res, next) {
    console.log('error 500');

    res.format({
      html: function() {
        res.send(500, 'internal server error!!!!');
      },
      json: function() {
        res.send(500, {code: err.type, description: 'error detail'});
      }
    });
  });
}