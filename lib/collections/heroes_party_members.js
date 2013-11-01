module.exports = {
  name: 'heroes_party_members'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , name:               { type: 'text' }
  , hero_id:            { type: 'integer', references: { table: 'heroes' } }
  , char_id:            { type: 'integer', references: { table: 'characters' } }
  , attributes:         { type: 'json', default: '\'{}\'' }
  , created_at:         { type: 'timestamp', default: 'now()' }
  }
};