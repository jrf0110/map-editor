var session = module.exports = {};

session.get = function( req, res ){
  res.json({ data: req.session });
};

session.create = function( req, res ){
  
};

session.del = function( req, res ){
  delete req.session;
  res.status(204).send();
};