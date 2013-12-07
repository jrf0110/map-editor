var dirac = require('dirac');
var utils = require('utils');

var schema = module.exports = {
  name: 'users'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , facebook_id:        { type: 'integer', unique: true }
  , fb_access_token:    { type: 'text' }
  , fb_profile:         { type: 'json', default: "'{}'" }
  , created_at:         { type: 'timestamp', default: 'now()' }
  }

, embeds: {
    heroes: function( results, $query, callback ){
      if ( !$query.where ) return callback();
      
      var queryable = [ 'id' ];
      var queryableMap = { id: 'user_id' };
      var fields = Object.keys( $query.where ).intersect( queryable );

      if ( fields.length === 0 ) return callback();

      var $heroQuery = utils.pick( $query.where, fields );

      dirac.dals.heroes.find( $heroQuery, callback );
    }
  }
};

dirac.use( function(){
  // Quick and diry heroes lookup
  dirac.dals.users.after( 'findOne', function( results, query, schema, next ){
    if ( results.length === 0 ) return next();

    var user = results[0];
    dirac.dals.heroes.find({ user_id: user.id }, function( error, heroes ){
      if ( error ) return next( error );
      user.heroes = heroes;
      next();
    });
  });
});
