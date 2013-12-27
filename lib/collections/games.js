var dirac = require('dirac');

dirac.register( module.exports = {
  name: 'games'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , stage_id:           { type: 'integer', references: { table: 'stages' } }
  , created_at:         { type: 'timestamp', default: 'now()' }
  }
});