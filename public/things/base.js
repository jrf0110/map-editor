define(function(require){
  var utils = require('utils');

  return utils.View.extend({
    className: 'thing'

  , render: function(){
      this.$el.html( this.template( this.model.toJSON() ) );

      this.renderPosition();

      return this;
    }

  , renderPosition: function(){
      this.$el.css({
        '-webkit-transform': 'translate3d(' + [
          this.options.tileSize * this.model.get('x')
        , this.options.tileSize * this.model.get('y')
        ].join('px, ') + 'px, 0)'
      , width:  this.options.tileSize * this.model.get('width') + 'px'
      , height: this.options.tileSize * this.model.get('height') + 'px'
      });

      return this;
    }
  });
});