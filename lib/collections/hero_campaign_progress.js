module.exports = {
  name: 'hero_campaign_progress'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , hero_id:  { type: 'integer', references: { table: 'heroes' } }
  , act:      { type: 'integer', references: { table: 'campaigns', column: 'act' } }
  , level:    { type: 'integer', references: { table: 'campaign_levels', column: 'level' } }
  , enemies:  { type: 'json', default: "'[]'" }
  }
};