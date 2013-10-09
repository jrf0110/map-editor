/**
 * Character 1
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var Character = require('../character');
  var utils     = require('utils');
  var gamepad   = require('gamepad');

  return Character.extend({
    template: utils.template([
      '<div class="thing character" style="'
    , 'width: 32px;'
    , 'height: 32px;'
    , 'background: url(\'http://fc03.deviantart.net/fs32/f/2008/234/b/e/RPG_Maker_VX_Sprites_by_NWinmore.png\');'
    , 'background-position-x: 32px;'
    , '"></div>'
    ].join(''))

  , events: {
      'click': 'onClick'
    }

  , onClick: function(){
      gamepad.takeControl( this.model );
    }
  });
});