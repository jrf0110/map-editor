var db    = require('db');
var m     = require('middleware');

module.exports = function( app ){
  app.get('/heroes/:id'
  , m.findUsersHero({ param: 'id' })

    // Lookup current level
  , function( req, res, next ){
      var id = res.locals.hero.campaign_level_id;
      console.log(id);
      db.campaign_levels.findOne( id, function( error, level ){
        if ( error ) return res.send(500);
console.log(level);
        res.locals.level = level;

        next();
      });
    }

  , m.view( 'main-game/main-game-view.html' )
  );
};