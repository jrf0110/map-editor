module.exports = {
  name: 'users_characters'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , user_id:            { type: 'integer', references: { table: 'users' } }
  , char_id:            { type: 'integer', references: { table: 'characters' } }
  , created_at:         { type: 'timestamp', default: 'now()' }
  , attributes:         { type: 'json', default: '\'{}\'' }
  }
};