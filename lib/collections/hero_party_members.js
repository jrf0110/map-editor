var dirac = require('dirac');
var utils = require('utils');
var Thing = require('../objects/thing').factory();

dirac.register( module.exports = {
  name: 'hero_party_members'
, schema: utils.extend({
    id:                 { type: 'serial', primaryKey: true }
  , name:               { type: 'text' }
  , hero_id:            { type: 'integer', references: { table: 'heroes' } }
  , char_id:            { type: 'integer', references: { table: 'characters' } }
  , attributes:         { type: 'json', default: '\'{}\'' }
  , created_at:         { type: 'timestamp', default: 'now()' }
  }, Thing )
});