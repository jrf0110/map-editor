var dirac = require('dirac');
var utils = require('utils');
var db = dirac.dals;

module.exports = {
  name: 'heroes'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , user_id:            { type: 'integer', references: { table: 'users' } }
  , name:               { type: 'text' }
  // , level:              { type: 'integer', unique: true }
  , attributes:         { type: 'json', default: '\'{}\'' }
  , created_at:         { type: 'timestamp', default: 'now()' }
  }

, defaultEmbeds: {
    party: true
  }

, embeds: {
    party: function( results, $query, callback ){
      if ( !$query.where ) return callback();

      var queryable = [ 'id' ];
      var queryableMap = { id: 'hero_id' };
      var fields = Object.keys( $query.where ).intersect( queryable );

      var $partyQuery = utils.pick( $query.where, fields );

      // Translate the keys that change from hero->parties
      for ( var key in $partyQuery ){
        if ( key in queryableMap ){
          $partyQuery[ queryableMap[ key ] ] = $partyQuery[ key ];
          delete $partyQuery[ key ];
        }
      }

      if ( typeof $query.embeds.parties === 'object' ){
        $partyQuery = utils.extend( $partyQuery, $query.embeds.parties );
      }

      dirac.dals.hero_party_members.find( $partyQuery, callback );
    }
  }
};

var filters = {
  setupCampaignProgress: function( results, query, schema, next ){
    var dal = dirac.dals[ module.exports.name ];

    db.hero_campaign_progress.insert({
      hero_id:  results[0].id
    , act:      1
    , level:    1
    }, next );
  }

, copyInitialParty: function( results, query, schema, next ){
    var dal = dirac.dals[ module.exports.name ];

    var hero_id = results[0].id;

    db.campaigns.findOne({ act: 1 }, function( error, campaign ){
      if ( error ) return next( error );

      var options = {
        columns: [ 'hero_id', 'char_id', 'name', 'attributes' ]
      , expression: {
          type: 'select'
        , table: 'characters'
        , columns: [
            { expression: hero_id, alias: 'hero_id' }
          , { name: 'id', alias: 'char_id' }
          , { name: 'name' }
          , { name: 'baseAttr', alias: 'attributes' }
          ]
        , where: {
            id: { $in: campaign.initial_characters }
          }
        }
      };

      db.hero_party_members.insert( null, options, function( error ){
        console.log(error);
        next( error );
      });
    });
  }
};

dirac.use( function(){
  var dal = dirac.dals[ module.exports.name ];

  // Set hero's campaign progress to level 1
  dal.after( 'insert', filters.setupCampaignProgress );
  // Copy Act I party members
  dal.after( 'insert', filters.copyInitialParty );
});