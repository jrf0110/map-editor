var dirac = require('dirac');

module.exports = {
  name: 'worlds'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , name:     { type: 'text' }
  , tileSize: { type: 'integer' }
  , size:     { type: 'integer' }
  , tiles:    { type: 'json', default: "'{}'" }
  , things:   { type: 'json', default: "'{}'" }
  }

// No need for this if everything is things json field
// , findOne: function( id, options, callback ){
//     if (typeof options == 'function'){
//       callback = options;
//       options = {};
//     }

//     if ( typeof options.joins !== 'object' ){
//       options.joins = {};
//     }

//     if ( !Array.isArray( options.columns ) ){
//       options.columns = ['*'];
//     }

//     if ( !options.groupBy ){
//       options.groupBy = [];
//     }

//     if ( !Array.isArray( options.groupBy ) ){
//       options.groupBy = [ options.groupBy ];
//     }

//     // Add things array
//     options.columns.push({
//       as: 'things'
//     , type: 'array_to_json'
//     , expression: {
//         type: 'array_agg'
//       , expression: 'things.thing'
//       }
//     });

//     // World group by
//     options.groupBy.push( 'worlds.id' );

//     // Add things join
//     options.joins.things = {
//       type: 'left'
//     , target: {
//         type: 'select'
//       , table: 'things'
//       , columns: [
//           'world_id'
//         , { type: 'row_to_json', expression: 'things', as: 'thing' }
//         ]
//       }
//     , on: { world_id: '$worlds.id$' }
//     };

//     return dirac.DAL.prototype.findOne.call( this, id, options, callback );
//   }
};