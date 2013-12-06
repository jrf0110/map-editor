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

var data = module.exports = [];

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