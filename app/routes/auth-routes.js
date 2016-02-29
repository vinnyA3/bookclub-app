var config = require('../../config/config'),
    jwt = require('jwt-simple'),
    moment = require('moment');

module.exports = function(app,express){
   //create router object
   var router = express.Router();

   // ============== CREATE TOKEN FUNCTION ===============
   function createToken(user){
     var payload = {
       sub: user.id,
       iat: moment.unix(),
       //save token 14 days
       exp: moment().add(14,'days').unix
     }
     return jwt.encode(payload, config.secret);
   };

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

   // =======================  ROUTES FOR SIGNUP AND LOGIN ===========================
	router.post('/signup', function(req,res){
		//create a new user object
		var newUser = new User();
			console.log(req.body);
			newUser.name = req.body.name;
			newUser.email = req.body.email;
			newUser.password = newUser.hashPassword(req.body.password);

		newUser.save(function(err,user){
			if(err){
				//if we have a duplicate entry, return an error
				if(err.code == 11000){
					return res.send({success:false, message: 'A user with that name already exists!'});
				}else{
					res.send(err);
				}
			}
			//if all is well, we want to send a token for the user to use
			return res.send({success:true, token: createToken(user), user:user});
		});
	});

  router.post('/login', function(req,res){
		//first check if the user is in the database
		User.findOne({'email':req.body.email})
			.select('email password')
			.exec(function(err,user){
				if(err){throw err;}
				if(!user){
					return res.send({success:false, message:'That user does not exist!'});
				}else if(user){
					//check if the password is valid
					var validPass = user.comparePassword(req.body.password);
					if(!validPass){
						return res.send({success:false, message:'Incorrect password!'});
					}else{
						return res.send({success:true, token:createToken(user)});
					}
				}
			});
	});

  //return express router
  return router;

};
