/**
 * Static class for dragging elements
 */

define(function(require){
  var
    // 3rd Party Dependencies
    $         = require('jquery')
  , _         = require('underscore')
  , Backbone  = require('backbone')

    // App Dependencies

    // Module Variables
  , index     = 0   // id for next element added
  , size      = 0   // Size of the object pool
  , els       = {}  // Object pool
  , hand = {
      /**
       * Kicks off the observation. Called when we go from size 0 to 1
       */
      start: function(){
        window.addEventListener('mousemove', hand.onMouseMove);
        window.addEventListener('mouseup', hand.onMouseUp);
        $(document.body).addClass('dragging');
        hand.trigger('start');
      }
      /**
       * Stop observation
       * @param  {Object} e Event object from the mouseup event
       */
    , stop: function(e){
        hand.trigger('stop', e);
        $(document.body).removeClass('dragging');
        window.removeEventListener('mousemove', hand.onMouseMove);
        window.removeEventListener('mouseup', hand.onMouseUp);
        els = {};
        size = index = 0;
      }
      /**
       * Grabs a jquery element - Could easily take out jquery, but I chose to leave it in for now
       * @param  {jQuery} $el Element to pick up
       * @param  {Object} e   Event from the mousedown event that contains offsets for the element
       */
    , grab: function($el, e){
        if (size === 0) hand.start();
        els["el" + index++] = { $el: $el, offsetX: e.offsetX, offsetY: e.offsetY };
        size++;
        hand.trigger('grab', $el, els);
      }
      /**
       * Drops the specified element
       * @param  {jQuery} $el The element to be dropped
       */
    , drop: function($el){
        for (var i = size - 1, el; i >= 0; i--) {
          el = els["el" + i];
          if (el.$el === $el){
            delete els["el" + i];
            size--;
            break;
          }
        }
        if (size === 0) hand.stop();
        hand.trigger('drop', $el, $pickedUp);
      }
    , translateElements: function(x, y){
        for (var i = size - 1, el; i >= 0; i--) {
          el = els["el" + i];
          el.$el.css('transform', 'translate3d(' + (x - el.offsetX) + 'px,' + (y - el.offsetY) + 'px, 0)');
        }
      }
    , onMouseMove: function(e){
        hand.translateElements(e.clientX, e.clientY);
      }
    , onMouseUp: function(e){
        hand.stop(e);
      }
    }
  ;
  return _.extend(hand, Backbone.Events);
});
