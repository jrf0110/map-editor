var db    = require('db');
var m     = require('middleware');

module.exports = function( app ){
  app.get('/heroes/:id'
  , m.findUsersHero({ param: 'id' })
  , function( req, res, next ){
      console.log(res.locals.user);
      next();
    }

  , function lookupCurrentLevel( req, res, next ){
      db.campaign_levels.findHeroCampaignLevel( req.param('id'), function( error, level ){
        if ( error ) return res.send(500);

        res.locals.level = level;

        next();
      });
    }

  , m.view( 'main-game/main-game-view.html' )
  );
};