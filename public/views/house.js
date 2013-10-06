define(function(require){
  var Backbone  = require('backbone');
  var _         = require('underscore');
  var Thing     = require('../models/thing');

  return Backbone.View.extend({
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

  , initialize: function( options ){
      this.model = new Thing( _.defaults( options || {}, {
        x:      4
      , y:      6
      , width:  14
      , height: 14
      }));
      return this;
    }

  , render: function(){
      this.$el.html( this.template( this.model.toJSON() ) );

      return this;
    }
  });
});