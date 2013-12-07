/**
 * Data.Characters
 * {
    id
  , name
  , avatar
  , sprite
  , baseAttr
  , created_at
  }
 */


module.exports = function( db, callback ){
  var data = [];

  var options = { returning: ['id'] };

  // Initial characters for Act 1
  data.push({
    name: 'Bob'
  , avatar: 'http://placekitten.com/100/100'
  , sprite: '/assets/sprites/character-1.png'
  , baseAttr: {}
  });

  data.push({
    name: 'Alice'
  , avatar: 'http://placekitten.com/100/100'
  , sprite: '/assets/sprites/character-2.png'
  , baseAttr: {}
  });

  data.push({
    name: 'Amisa'
  , avatar: 'http://placekitten.com/100/100'
  , sprite: '/assets/sprites/amisa-1.png'
  , isHero: true
  , baseAttr: {}
  });

  db.characters.insert( data, options, function( error, results ){
    if ( error ) return callback( error );

    var $where = { act: 1 };
    var $update = {
      initial_characters: results.map( function( c ){
        return c.id;
      })
    };

    db.campaigns.update( $where, $update, callback );
  });
};
