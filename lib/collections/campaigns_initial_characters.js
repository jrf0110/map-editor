module.exports = {
  name: 'campaigns_initial_characters'
, schema: {
    id:             { type: 'serial', primaryKey: true }
  , campaign_act:   { type: 'integer', references: { table: 'campaigns', column: 'act' } }
  , character_id:   { type: 'integer', references: { table: 'characters', column: 'id' } }
  }
};