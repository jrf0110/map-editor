var dirac = require('dirac');

module.exports = {
  name: 'stages'
, schema: {
    id:         { type: 'serial', primaryKey: true }
  , name:       { type: 'text' }
  , size:       { type: 'integer' }
  , tiles:      { type: 'json', default: "'[]'" }
  , things:     { type: 'json', default: "'{}'" }
  }
};