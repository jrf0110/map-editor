module.exports = {
  json: function( val ){
    return JSON.stringify( val, true, '  ' );
  }

, pre: function( val ){
    return '<pre>' + val + '</val>';
  }
};