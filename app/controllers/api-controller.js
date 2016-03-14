/* API Controller */
var User = require('../models/user'),
    Book = require('../models/book'),
    BookRequest = require('../models/book-requests');

exports.getAllBooks = function(req,res){
    //return all books
    Book.find({}, function(err,books){
      if(err){
        return res.send(err);
      }
      return res.send(books);
    });
};

exports.addNewBook = function(req,res){
  //create new book, save it, update user's books field with pushed book's ObjectID
   var newBook = new Book();
   newBook.title = req.body.title;
   newBook.imgLink = req.imgLink;
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
};

exports.getUserBooks = function(req,res){
  //get user and populate books
  User.findOne({"_id": req.user})
      .populate('books')
      .exec(function(err,user){
        if(err){
          return res.send(err);
        }
        return res.send(user);
      });
};

exports.deleteBook = function(req,res){
    //find user and delete the book reference based on passed ID
    User.findOneAndUpdate({"_id": req.user}, {$pull: {'books': req.params.book_id}}, function(err,user){
      if(err){
        console.log(err);
        return res.send(err);
      }
      return res.send({message: 'Book successfully deleted!'});
    });
};

exports.getOtherUsersBooks = function(req,res){
  //get the the clicked user's accounts page - populate books
  User.find({'_id': req.params.user_id})
      .populate('books')
      .exec(function(err,user){
        if(err){
          console.log(err);
          return res.send(err);
        }
        //if the req.user is the name as the passed in params, send a logged_in_user: true to redirect to user's account page
        if(req.user === req.params.user_id){
          return res.send({logged_in_user: true});
        }
        //return the user information
        return res.send(user);
      });
};

exports.requestBookSwap = function(req,res){

  var newBookSwapRequest = req.bookRequest;
  /*is this request for the currently logged in User? (not an outstanding request from the logged in user)
  newBookSwapRequest.isUsersRequest = false; //false here, its for the other user */
  newBookSwapRequest.isUsersRequest = false;
  console.log(newBookSwapRequest);

  //push the new the request into User Document
    User.findOne({ '_id': req.user}, function(err,user){
      if(err){
        console.log(err);
         return res.send(err);
      }
      user.bookRequests.push(newBookSwapRequest);
      //save the user
      user.save(function(err){
        if(err){
          console.log(err);
          return res.send(err);
        }
        console.log('successfully added book request');
        return res.send({message:'Book Request added successfully!'});
      });//end save

    });//end update

};

exports.getUserInbox = function(req,res){
  User.find({'_id': req.user})
    .populate('bookRequests')
    .exec(function(err,user){
      if(err){
        return res.send(err);
      }
      return res.send(user);
    });
};

exports.setApproval = function(req,res){
  User.find(
    {'bookRequests._id': req.body.bookRequestId},
  //callback
  function(err,users){

    if(err){
      console.log(err);
      return res.send(err);
    }

    for(var i = 0; i < users.length; ++i){
      users[i].bookRequests.id(req.body.bookRequestId).approved = true;
      console.log(users[i]);
      users[i].save();
    }

    console.log('success!!');
    return res.send({success: true, message: 'successfully updated'});
    /*users contains and array of users that contain the book requests
    users.forEach(function(request){
      console.log('looping...');
      //for each bookrequest, set the approved field to true
      request.bookRequests.id(req.body.bookRequestId).approved = true;

    });
    //save the users*/

  });//end find
};

exports.deleteRequest = function(req,res){
  User.findOne({'_id': req.user}, function(err,user){
    if(err){
      return res.send(err);
    }
    console.log(req.params.request_id);
    console.log(user);
    user.bookRequests.id(req.params.request_id).remove();

    user.save(function(err){
      if(err){
        return res.send(err)
      }
      return res.send({success: true, message: 'Request deletion successful'});
    })
  });
};

exports.getAccountInfo = function(req,res){
  User.find({'_id': req.user}, function(err,user){
     if(err){
       return res.send(err);
     }
     //return the user
     return res.send(user);
  });
};

exports.updateAccountInfo = function(req,res){
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
};

exports.deleteAccount = function(req,res){
  User.find({'_id':req.user})
      .remove(function(err){
        if(err){
          return res.send(err);
        }
        return res.send({message: 'successfully deleted!'});
      });
};
