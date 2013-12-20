var dirac = require('dirac');

module.exports = {
  name: 'campaign_levels'
, schema: {
    id:           { type: 'serial', primaryKey: true }
  , name:         { type: 'text' }
  , level:        { type: 'integer', unique: true }
  , campaign_act: { type: 'integer', references: { table: 'campaigns', column: 'act' } }
  , stage_id:     { type: 'integer', references: { table: 'stages' } }
  }

, joins: {
    stage: {
      type: 'left'
    , target: 'stages'
    , on: { id: '$campaign_levels.stage_id$' }
    }
  }

, findHeroCampaignLevel: function( heroId, callback ){
    var $where = {};

    var options = {
      joins: []
    };

    options.joins.push({
      type: 'left'
    , target: 'hero_campaign_progress'
    , on: { hero_id: heroId }
    });

    return this.findOne( $where, options, callback );
  }
};

function addStageJoin( $query, schema, next ){
  var dal = dirac.dals[ module.exports.name ];

  if ( !$query.columns ) $query.columns = ['*'];

  $query.columns.push( 'stages.size', 'stages.tiles', 'stages.things' );

  if ( !$query.joins ) $query.joins = [];

  $query.joins.push( dal.joins.stage );

  next();
}

dirac.use( function(){
  var dal = dirac.dals[ module.exports.name ];

  dal.before( 'find',     addStageJoin );
  dal.before( 'findOne',  addStageJoin );
});