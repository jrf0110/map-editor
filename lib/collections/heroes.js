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
  setupCampaignProgress: function( id, query, schema, next ){
    var dal = dirac.dals[ module.exports.name ];

    db.hero_campaign_progress.insert({
      hero_id:  id
    , act:      1
    , level:    1
    });
  }

, copyInitialParty: function( id, query, schema, next ){
    var dal = dirac.dals[ module.exports.name ];
    
  }
};

dirac.use( function(){
  var dal = dirac.dals[ module.exports.name ];

  // Set hero's campaign progress to level 1
  dal.after( 'insert', filters.setupCampaignProgress );
  // Copy Act I party members
  dal.after( 'insert', filters.setupCampaignProgress );
});