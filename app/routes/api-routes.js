var User = require('../models/user.js'),
    OutstandingRequest = require('../models/outstanding-requests.js'),
    SwapRequests = require('../models/swap-requests.js');

module.exports = {
  // =============== AUTHENTICATION MIDDLEWARE ===========
  function ensureAuthenticated(req,res,next){
    if(!req.headers.authorization){
      return res.status(401).send({message: 'Please make sure that your request has an Authorization header!'});
    }
    var token = req.headers.authorization.split(' ')[1];

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

  //================ API ROUTES ==========================
  


};
