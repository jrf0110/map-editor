module.exports = {
  name: 'campaign_levels'
, schema: {
    id:           { type: 'serial', primaryKey: true }
  , name:         { type: 'text' }
  , campaign_id:  { type: 'integer', references: { table: 'campaigns' } }
  , stage_id:     { type: 'integer', references: { table: 'stages' } }
  }
};