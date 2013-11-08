module.exports = {
  name: 'heroes'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , user_id:            { type: 'integer', references: { table: 'users' } }
  , name:               { type: 'text' }
  , level:              { type: 'integer' }
  , attributes:         { type: 'json', default: '\'{}\'' }
  , campaign_id:        { type: 'integer', references: { table: 'campaigns' } }
  , campaign_level_id:  { type: 'integer', references: { table: 'campaign_levels' } }
  , created_at:         { type: 'timestamp', default: 'now()' }
  }
};