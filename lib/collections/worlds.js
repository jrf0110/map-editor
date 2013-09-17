module.exports = {
  name: 'worlds'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , name:     { type: 'text' }
  , tileSize: { type: 'integer' }
  , size:     { type: 'integer' }
  , tiles:    { type: 'json' }
  }
};