var User = require('../models/user.js'),
    Book = require('../models/book.js'),
    OutstandingRequest = require('../models/outstanding-requests.js'),
    SwapRequests = require('../models/swap-requests.js'),
    jwt = require('jwt-simple'),
    config = require('../../config/config.js'),
    moment = require('moment');

module.exports = function(app,express){
  //create express router
  var router = express.Router();

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

  // ===== ALL BOOKS =====
  //get books
  router.get('/all-books', ensureAuthenticated, function(req,res){
    //return all books
    Book.find({}, function(err,books){
      if(err){
        return res.send(err);
      }
      return res.send(books);
    });
  });

  //==== USER BOOKS =====
  router.route('/user-books')
   //create book
  .post(ensureAuthenticated, function(req,res){
    //create new book, save it, update user's books field with pushed book's ObjectID
     var newBook = new Book();
     newBook.title = req.body.title;
     newBook.imgLink = req.body.imgLink;
     newBook.owner = req.user;

     newBook.save(function(err,book){
       if(err){
         return res.send(err);
       }
       User.update({'_id': req.user}, {$push:{books: book.id}}, function(err,user){
         if(err){
           return res.send(err);
         }
         return res.send({success:true, message:'Book has been added!', user:user});
       });
     });
  })
  //get user and populate books
  .get(ensureAuthenticated, function(req,res){
    User.findOne({"_id": req.user})
        .populate('books')
        .exec(function(err,user){
          if(err){
            return res.send(err);
          }
          return res.send(user);
        });
  });

 //====== OTHER USERS' PROFILE PAGE ====
  router.route('/user/:user_id')
    //get the page info and selected book
    .get(ensureAuthenticated, function(req,res){
      //get the the clicked user's accounts page
      User.find({'_id': req.params.user_id}, function(err,user){
        if(err){
          return res.send(err);
        }
        if(!user){
          return res.send({message: 'Failed to retrieve User Information.  Please try again later'});
        }else{
          return res.send(user);
        }
      });
    })
    .post(ensureAuthenticated, function(req,res){
      //create the new book request
      var newOutstandingRequest = new OutstandingRequest();
      newOutstandingRequest.to = req.params.user_id,
      newOutstandingRequest.requestedBook = req.body.requested,
      newOutstandingRequest.swapFor = req.body.swapfor,
      newOutstandingRequest.status = 'Not Yet Approved',
      newOutstandingRequest.belongsTo = req.user;

      //save the request
      newOutstandingRequest.save(function(err,swapRequest){
        if(err){
          return res.send(err);
        }
        //update the Users's outstandingRequests array - push in swapRequest ObjectId
        User.update({'_id': req.user}, {$push: {outstandingRequests: swapRequest.id}}, function(err,user){
          if(err){
            return res.send(err);
          }
          //return success
          return res.send({success:true, message: 'Outstanding request Added!', user: user});
        });
      }); //end outstanding request save
    });

  //==== USER ACCOUNT ======
  router.route('/account')
    .get(ensureAuthenticated, function(req,res){
        User.find({'_id': req.user}, function(err,user){
           if(err){
             return res.send(err);
           }
           //return the user
           return res.send(user);
        });
    })
    .put(ensureAuthenticated, function(req,res){
      User.find({'_id':req.user}, function(err,user){
        if(err){
          return res.send(err);
        }
        //if we have options to change in the request, set the updated properties on the user
        if(req.body.name){user.name = req.body.name;}
        if(req.body.email){user.email = req.body.email;}
        if(req.body.password){user.name = req.body.password;}

        //save the user
        user.save(function(err){
            if(err){
              return res.send(err);
            }
            //return a success message
            return res.send({message: 'Information Updated!'});
        });

      });
    })
    .delete(ensureAuthenticated, function(req,res){
      User.remove({'_id': req.user}, function(err){
        if(err){
          return res.send(err);
        }
        return res.send({message: 'successfully deleted!'});
      });
    });

  //return the express router
  return router;
};
