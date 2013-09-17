module.exports = {
  name: 'things'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , world_id: { type: 'integer', references: { table: 'worlds', column: 'id' } }
  , type:     { type: 'text' }
  , name:     { type: 'text' }
  , size:     { type: 'integer' }
  , html:     { type: 'text' }
  , attr:     { type: 'json' }
  }
};