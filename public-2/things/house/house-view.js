/**
 * House View
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var Thing = require('thing');
  var House = Thing.extend({
    className: 'thing house-1'
  , tagName: 'table'
  , template: _.template([
        '<tr>'
      , '  <td class="house-top-left"></td>'
      , '  <td class="house-top-middle"></td>'
      , '  <td class="house-top-right"></td>'
      , '</tr>'
      , '<tr>'
      , '  <td class="house-middle-left"></td>'
      , '  <td class="house-middle-middle"></td>'
      , '  <td class="house-middle-right"></td>'
      , '</tr>'
      , '<tr>'
      , '  <td class="house-bottom-left"></td>'
      , '  <td class="house-bottom-middle"></td>'
      , '  <td class="house-bottom-right"></td>'
      , '</tr>'
    ].join('\n'))
  });

  return House;
});