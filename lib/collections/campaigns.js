module.exports = {
  name: 'campaigns'
, schema: {
    id:             { type: 'serial', unique: true }
  , act:            { type: 'integer', primaryKey: true }
  , name:           { type: 'text' }
  , initial_characters: { type: 'integer[]', default: "Array[]::integer[]" }
  }
};