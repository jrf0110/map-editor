/**
 * On Screen Controls
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');
  var gamepad = require('gamepad');

  var OnScreenControls = utils.View.extend({
    className: 'on-screen-controls'
  , tagName: 'ul'

  , template: [
      '<li class="control">'
    , '  <button data-action="up" class="control-btn">Up</button>'
    , '</li>'
    , '<li class="control">'
    , '  <button data-action="down" class="control-btn">Down</button>'
    , '</li>'
    , '<li class="control">'
    , '  <button data-action="left" class="control-btn">Left</button>'
    , '</li>'
    , '<li class="control">'
    , '  <button data-action="right" class="control-btn">Right</button>'
    , '</li>'
    , '<li class="control">'
    , '  <button data-action="start" class="control-btn">Start</button>'
    , '</li>'
    ].join('')

  , events: {
      'click .control-btn': 'onControlClick'
    }

  , onControlClick: function( e ){
      gamepad[ $( e.currentTarget ).data('action') ]();
    }

  , render: function(){
      this.$el.html( this.template );
      return this;
    }
  });

  return OnScreenControls;
});