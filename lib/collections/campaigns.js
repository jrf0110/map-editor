module.exports = {
  name: 'campaigns'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , act:      { type: 'integer', unique: true }
  , name:     { type: 'text' }
  }
};