var dirac = require('dirac');

module.exports = {
  name: 'campaign_levels'
, schema: {
    id:           { type: 'serial', primaryKey: true }
  , name:         { type: 'text' }
  , campaign_id:  { type: 'integer', references: { table: 'campaigns' } }
  , stage_id:     { type: 'integer', references: { table: 'stages' } }
  }

, joins: {
    stage: {
      type: 'left'
    , target: 'stages'
    , on: { id: '$campaign_levels.stage_id$' }
    }
  }

, find: function( where, options, callback ){
    if (typeof options == 'function'){
      callback = options;
      options = {};
    }

    if ( !options.columns ) options.columns = ['*'];

    options.columns.push( 'stages.size', 'stages.tiles', 'stages.things' );

    if ( !options.joins ) options.joins = [];

    options.joins.push( this.joins.stage );

    dirac.DAL.prototype.find.call( this, where, options, callback );
  }

, findOne: function( where, options, callback ){
    if (typeof options == 'function'){
      callback = options;
      options = {};
    }

    if ( !options.columns ) options.columns = ['*'];

    options.columns.push( 'stages.size', 'stages.tiles', 'stages.things' );

    if ( !options.joins ) options.joins = [];

    options.joins.push( this.joins.stage );

    dirac.DAL.prototype.findOne.call( this, where, options, callback );
  }
};