module.exports = {
  name: 'things'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , level_id:           { type: 'integer', references: { table: 'stages', column: 'id' } }
  , type:               { type: 'text' }
  , name:               { type: 'text' }
  , x:                  { type: 'integer', default: "'0'"}
  , y:                  { type: 'integer', default: "'0'"}
  , width:              { type: 'integer', default: "'1'"}
  , height:             { type: 'integer', default: "'1'"}
  , attr:               { type: 'json',    default: "'{}'" }
  , perceivedModX:      { type: 'integer', default: "'0'" }
  , perceivedModY:      { type: 'integer', default: "'0'" }
  , perceivedModWidth:  { type: 'integer', default: "'0'" }
  , perceivedModHeight: { type: 'integer', default: "'0'" }
  }
};