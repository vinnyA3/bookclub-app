var User = require('../models/user'),
    Book = require('../models/book'),
    BookRequest = require('../models/book-requests'),
    jwt = require('jwt-simple'),
    config = require('../../config/config'),
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

  //======= SPECIFIC USER BOOK ==========
  router.route('/user-books/:book_id')
    //delete a book
    .delete(ensureAuthenticated, function(req,res){
      //find user and delete the book reference based on passed ID
      User.findOneAndUpdate({"_id": req.user}, {$pull: {'books': req.params.book_id}}, function(err,user){
        if(err){
          return res.send(err);
        }
        return res.send({message: 'Book successfully deleted!'});
      });
    });


 //====== OTHER USERS' PROFILE PAGE ====
  router.route('/user/:user_id')
    //get the page info and selected book
    .get(ensureAuthenticated, function(req,res){
      console.log(req.user);
      console.log(req.params.user_id);
      //get the the clicked user's accounts page - populate books
      User.find({'_id': req.params.user_id})
          .populate('books')
          .exec(function(err,user){
            if(err){
              return res.send(err);
            }
            return res.send(user);
          });
    })
    .post(ensureAuthenticated, function(req,res){
      var users_ids = [req.user, req.params.user_id],
          //create the new book request
          newBookSwapRequest = new BookRequest();

      newBookSwapRequest.requestFor = req.params.user_id;
      newBookSwapRequest.from = req.user;
      newBookSwapRequest.requestedBook = req.body.title;
      newBookSwapRequest.swapFor = req.body.swapFor;
      newBookSwapRequest.approved = false;
      //save the request
      newBookSwapRequest.save(function(err,bookRequest){
        if(err){
          return res.send(err);
        }
        //save the request and push the requests's id to the req.user's bookReq arr and the user -> user_id's bookReq arr
        User.update(
          { _id: { $in: users_ids}},
          { $push: {bookRequests: bookRequest.id}},
          { upsert:true, multi:true},
        function(err){
          if(err){
            return res.send(err);
          }
          return res.send({message:'Book Request added successfully!'});
        });

      });
    });

  // === USER INBOX ========
  router.route('/inbox')
  //refactor to use book request
    .get(ensureAuthenticated, function(req,res){
      var populateQuery = [
        {path: 'outstandingRequests'}
      ];
      User.find({'_id': req.user})
        .populate(populateQuery)
        .exec(function(err,user){
          if(err){
            return res.send(err);
          }
          return res.send(user);
        });
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
      User.findById(req.user, function(err,user){
        if(err){
          return res.send(err);
        }

        //if we have options to change in the request, set the updated properties on the user
        if(req.body.name){user.name = req.body.name;}
        if(req.body.email){user.email = req.body.email;}
        if(req.body.location){user.location = req.body.location}
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
