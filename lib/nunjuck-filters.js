module.exports = {
  json: function( val, indent ){
    return JSON.stringify( val, true, '  ' );

    // indent = indent || 0;

    // var spacing = " ";
    // while ( --indent ) spacing += spacing;
    
    // var out = JSON.stringify( val, true, '  ' );

    // if ( !out ) return "";

    // return out.split('\n').map( function( line ){
    //   console.log(spacing + line);
    //   return spacing + line;
    // }).join('\n');
  }

, pre: function( val ){
    return '<pre>' + val + '</val>';
  }
};