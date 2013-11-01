var db    = require('db');
var m     = require('middleware');

module.exports = function( app ){
  app.get('/heroes/:id'
  , function( req, res, next ){
      res.locals.hero = req.user.heroes.find( function( hero ){
        return hero.id === +req.param('id');
      });

      next();
    }
  , m.view( 'main-game/main-game-view.html' )
  );
};