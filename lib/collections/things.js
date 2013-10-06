module.exports = {
  name: 'things'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , world_id: { type: 'integer', references: { table: 'worlds', column: 'id' } }
  , type:     { type: 'text' }
  , name:     { type: 'text' }
  , x:        { type: 'integer', default: "'0'"}
  , y:        { type: 'integer', default: "'0'"}
  , width:    { type: 'integer', default: "'1'"}
  , height:   { type: 'integer', default: "'1'"}
  , attr:     { type: 'json', default: "'{}'" }
  }
};