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

  var options = { returning: ['id', 'name'] };

  // Initial characters for Act 1
  data.push({
    name: 'Bob'
  , avatar: 'http://placekitten.com/100/100'
  , sprite: '/assets/sprites/character-2.png'
  , attributes: {}
  });

  data.push({
    name: 'Alice'
  , avatar: 'http://placekitten.com/100/100'
  , sprite: '/assets/sprites/character-2.png'
  , attributes: {}
  });

  data.push({
    name: 'Amisa'
  , avatar: 'http://placekitten.com/100/100'
  , sprite: '/assets/sprites/amisa-1.png'
  , attributes: {}
  });

  db.characters.insert( data, options, function( error, results ){
    if ( error ) return callback( error );

    var $where = { act: 1 };
    var $update = {
      initial_characters: results.filter( function( c ){
        return c.name !== 'Amisa';
      }).map( function( c ){
        return c.id;
      })
    };

    db.campaigns.update( $where, $update, callback );
  });
};
