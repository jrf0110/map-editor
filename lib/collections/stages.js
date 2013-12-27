var dirac = require('dirac');

dirac.register( module.exports = {
  name: 'stages'
, schema: {
    id:         { type: 'serial', primaryKey: true }
  , name:       { type: 'text' }
  , size:       { type: 'integer' }
  , tiles:      { type: 'json', default: "'[]'" }
  , things:     { type: 'json', default: "'{}'" }
  }
});