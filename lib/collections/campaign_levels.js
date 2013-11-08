module.exports = {
  name: 'campaign_levels'
, schema: {
    id:           { type: 'serial', primaryKey: true }
  , name:         { type: 'text' }
  , campaign_id:  { type: 'integer', references: { table: 'campaigns' } }
  , stage_id:     { type: 'integer', references: { table: 'stages' } }
  }

, findHeroCampaignLevel: function( heroId, callback ){
    var $where = {};

    var options = {
      columns: [ '*', 'stages.size', 'stages.tiles', 'stages.things' ]
    , joins: []
    };

    options.joins.push({
      type: 'left'
    , target: 'hero_campaign_progress'
    , on: { hero_id: heroId }
    });

    options.joins.push({
      type: 'left'
    , target: 'stages'
    , on: { id: '$campaign_levels.stage_id$' }
    });

    this.findOne( $where, options, callback );
  }
};