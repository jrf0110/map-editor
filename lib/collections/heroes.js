var dirac     = require('dirac');
var utils     = require('utils');
var db        = dirac.dals;
var Character = require('../objects/character').factory();

dirac.register( module.exports = {
  name: 'heroes'
, schema: utils.extend( {}, Character, {
    id:                 { type: 'serial', primaryKey: true }
  , user_id:            { type: 'integer', references: { table: 'users' } }
  , name:               { type: 'text' }
  // , level:              { type: 'integer', unique: true }
  , attributes:         { type: 'json', default: '\'{}\'' }
  , created_at:         { type: 'timestamp', default: 'now()' }
  })

, queryDefaults: function(){
    return {
      groupBy:  []
    , columns:  ['*']
    , joins:    []
    };
  }

, defaultEmbeds: {

  }

, embeds: {
    // This chit is deprecated in favor of a join
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
});

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
        next( error );
      });
    });
  }
};

var addHeroesPartyJoin = function( $query, schema, done ){
  $query.columns.push({
    alias: 'party'
  , type: 'array_to_json'
  , expression: {
      type: 'array_agg'
    , expression: 'hpm.member'
    }
  });

  $query.joins.push({
    type: 'left'
  , alias: 'hpm'
  , target: {
      type: 'select'
    , table: 'hero_party_members'
    , columns: [ 'hero_id', {
        type: 'row_to_json'
      , expression: 'hero_party_members'
      , alias: 'member'
      }]
    }
  , on: {
      hero_id: '$heroes.id$'
    }
  });

  $query.groupBy.push('heroes.id');

  done();
};

var addProgressJoin = function( $query, schema, done ){
  $query.columns.push('hero_campaign_progress.*');

  $query.joins.push({
    type: 'left'
  , target: 'hero_campaign_progress'
  , on: { hero_id: '$heroes.id$' }
  });

  $query.groupBy.push('hero_campaign_progress.id');

  done();
};

dirac.use( function(){
  var dal = dirac.dals[ module.exports.name ];

  // Set hero's campaign progress to level 1
  dal.after( 'insert', filters.setupCampaignProgress );
  // Copy Act I party members
  dal.after( 'insert', filters.copyInitialParty );

  // one-to-one progress
  dal.before( 'find', addProgressJoin );
  dal.before( 'findOne', addProgressJoin );

  // Add heroes party join
  dal.before( 'find', addHeroesPartyJoin );
  dal.before( 'findOne', addHeroesPartyJoin );

  dal.after( 'find', dirac.cleanupNulls({ fields: ['party'] }) );
  dal.after( 'findOne', dirac.cleanupNulls({ fields: ['party'] }) );
});