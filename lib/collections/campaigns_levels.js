module.exports = {
  name: 'campaigns_levels'
, schema: {
    id:           { type: 'serial', primaryKey: true }
  , campaign_id:  { type: 'integer', references: { table: 'campaigns' } }
  , name:         { type: 'text' }
  }
};