var dirac = require('dirac');

dirac.register( module.exports = {
  name: 'characters'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , name:               { type: 'text' }
  , avatar:             { type: 'text' }
  , sprite:             { type: 'text' }
  , isHero:             { type: 'boolean', default: 'false' }
  , baseAttr:           { type: 'json', default: '\'{}\''}
  , created_at:         { type: 'timestamp', default: 'now()' }
  }
});