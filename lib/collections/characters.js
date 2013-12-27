var dirac = require('dirac');
var utils = require('utils');
var Character = require('../objects/character').factory();

dirac.register( module.exports = {
  name: 'characters'
, schema: utils.extend( {}, Character, {
    id: { type: 'serial', primaryKey: true }
  })
});