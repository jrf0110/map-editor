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

, defaultEmbeds: {
    heroes: true
  }

, embeds: {
    heroes: function( results, $query, callback ){
      if ( !$query.where ) return callback();
      
      var queryable = [ 'id' ];
      var queryableMap = { id: 'user_id' };
      var fields = Object.keys( $query.where ).intersect( queryable );

      var $heroQuery = utils.pick( $query.where, fields );

      // Translate the keys that change from users->heroes
      for ( var key in $heroQuery ){
        if ( key in queryableMap ){
          $heroQuery[ queryableMap[ key ] ] = $heroQuery[ key ];
        }
      }

      if ( typeof $query.embeds.heroes === 'object' ){
        $heroQuery = utils.extend( $heroQuery, $query.embeds.heroes );
      }

      dirac.dals.heroes.find( $heroQuery, callback );
    }
  }
};