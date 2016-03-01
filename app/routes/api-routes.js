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
  //books
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
  //get user's books - whole user
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
  //router.get('/userbooks', function(req,res){ });
  //post - create OutstandingRequest
  router.post('/make-book-request', ensureAuthenticated, function(req,res){
    //create the new book request
    var newOutstandingRequest = new OutstandingRequest();
    newOutstandingRequest.to = req.body.toUser,
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


  //return the express router
  return router;
};
