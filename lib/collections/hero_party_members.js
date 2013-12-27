var dirac     = require('dirac');
var utils     = require('utils');
var Character = require('../objects/character').factory();

dirac.register( module.exports = {
  name: 'hero_party_members'
, schema: utils.extend( {}, Character, {
    id:                 { type: 'serial', primaryKey: true }
  , hero_id:            { type: 'integer', references: { table: 'heroes' } }
  , char_id:            { type: 'integer', references: { table: 'characters' } }
  , created_at:         { type: 'timestamp', default: 'now()' }
  })
});