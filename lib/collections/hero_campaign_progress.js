module.exports = {
  name: 'hero_campaign_progress'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , hero_id:            { type: 'integer', references: { table: 'heroes' } }
  , campaign_id:        { type: 'integer', references: { table: 'campaigns' } }
  , campaign_level_id:  { type: 'integer', references: { table: 'campaign_levels' } }
  }
};