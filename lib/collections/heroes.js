var dirac = require('dirac');
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
    
    db.campaigns.findOne({
      campaign_act: 1
    }, function( error, campaign ){
      if ( error ) return next( error );

      camapaign.initial_characters.forEach( function( c ){
        c.hero_id = id;
        c.character_id = c.id;
        delete c.id;
      });

      db.heroes_party_members.insert( characters, next );
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