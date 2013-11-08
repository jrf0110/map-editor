define(function(require){
  var utils = require('utils');
  var config = require('config');

  return utils.View.extend({
    className: 'thing'

  , render: function(){
      this.$el.html( this.template({ model: this.model.toJSON() }) );

      this.renderPosition();

      return this;
    }

  , renderPosition: function(){
      this.$el.css({
        '-webkit-transform': 'translate3d(' + [
          config.tileSize * this.model.get('x')
        , config.tileSize * this.model.get('y')
        ].join('px, ') + 'px, 0)'
      , width:  config.tileSize * this.model.get('width') + 'px'
      , height: config.tileSize * this.model.get('height') + 'px'
      });

      return this;
    }
  });
});