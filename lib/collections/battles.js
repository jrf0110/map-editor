var dirac = require('dirac');

dirac.register( module.exports = {
  name: 'battles'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , name:     { type: 'text' }
  , data:     { type: 'json', default: "'{}'" }
  , stage_id: { type: 'integer', references: { table: 'stages' } }
  , user_id:  { type: 'integer', references: { table: 'users' } }
  , hero_id:  { type: 'integer', references: { table: 'heroes' } }
  }
});