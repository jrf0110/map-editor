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

    // Lookup current level
  , function( req, res, next ){
      db.campaign_levels.findHeroCampaignLevel( req.param('id'), function( error, level ){
        if ( error ) return res.send(500);

        res.locals.level = level;

        next();
      });
    }
  , m.view( 'main-game/main-game-view.html' )
  );
};