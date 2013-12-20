var dirac = require('dirac');

module.exports = {
  name: 'campaigns'
, schema: {
    id:             { type: 'serial', unique: true }
  , act:            { type: 'integer', primaryKey: true }
  , name:           { type: 'text' }
  , initial_characters: { type: 'integer[]', default: "Array[]::integer[]" }
  }

, defaultEmbeds: {
    // campaigns_initial_characters: true
  }

, embeds: {
    campaigns_initial_characters: function( results, $query, callback ){
      if ( results.length === 0 ) return callback();
      if ( typeof results[0] !== 'object' ) return callback();
      if ( !('act' in results[0]) ) return callback();

      dirac.dals.campaigns_initial_characters.find({
        campaign_act: results[0].act
      }, function( error, characters ){
        if ( error ) return callback( error );

        results[0].initial_characters = characters;

        callback();
      });
    }
  }
};