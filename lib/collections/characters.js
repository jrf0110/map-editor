module.exports = {
  name: 'characters'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , name:               { type: 'text' }
  , avatar:             { type: 'text' }
  , sprite:             { type: 'text' }
  , baseAttr:           { type: 'json', default: '\'{}\''}
  , created_at:         { type: 'timestamp', default: 'now()' }
  }
};