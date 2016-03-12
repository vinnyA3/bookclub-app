var jwt = require('jwt-simple'),
    config = require('../../config/config'),
    moment = require('moment');

// =============== AUTHENTICATION MIDDLEWARE ===============================
exports.ensureAuthenticated = function(req,res,next){
  if(!req.header('Authorization')) {
    return res.status(401).send({message: 'Please make sure that your request has an Authorization header! Login or Signup.'});
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try{
    payload = jwt.decode(token, config.secret);
  }
  catch(err){
    return res.status(401).send({message: err.message});
  }
  if (payload.exp <= moment().unix()){
    return res.status(401).send({message: 'Token has expired!'});
  }
  req.user = payload.sub;
  next();
};
