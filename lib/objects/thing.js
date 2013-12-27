module.exports.factory = function(){
  return {
    x:                  { type: 'integer', default: "'0'"   }
  , y:                  { type: 'integer', default: "'0'"   }
  , width:              { type: 'integer', default: "'1'"   }
  , height:             { type: 'integer', default: "'1'"   }
  , attributes:         { type: 'json',    default: "'{}'"  }
  , perceivedModX:      { type: 'integer', default: "'0'"   }
  , perceivedModY:      { type: 'integer', default: "'0'"   }
  , perceivedModWidth:  { type: 'integer', default: "'0'"   }
  , perceivedModHeight: { type: 'integer', default: "'0'"   }
  , created_at:         { type: 'timestamp', default: 'now()' }
  };
};