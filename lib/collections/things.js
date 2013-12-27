var dirac = require('dirac');
var utils = require('utils');
var Thing = require('../objects/thing').factory();

dirac.register( module.exports = {
  name: 'things'
, schema: utils.extend({
    id:                 { type: 'serial', primaryKey: true }
  , level_id:           { type: 'integer', references: { table: 'stages', column: 'id' } }
  , type:               { type: 'text' }
  , name:               { type: 'text' }
  }, Thing )
});