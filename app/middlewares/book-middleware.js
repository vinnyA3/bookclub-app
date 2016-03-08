var User = require('../models/user'),
    Book = require('../models/book'),
    BookRequest = require('../models/book-requests'),
    google = require('googleapis'),
    googlebooks = google.books('v1');

// ================ GOOGLE BOOKS API MIDDLWWARE =============================
exports.getBookCovers = function(req,res,next){
  
    var bookTitle = req.body.title;
    //call google books api
    googlebooks.volumes.list({
      q: bookTitle
    }, function(err,data){
      //if the volumeInfo object is undefined, set imagelink to placeholder image
       if(data.items[0].volumeInfo.imageLinks === undefined){
         req.imgLink = 'http://2.bp.blogspot.com/-ioujBTQNnXU/UXNkQrx_wLI/AAAAAAAAEqk/URmUI7ZBbu4/s1600/noimage.gif';
         next();
       }else{
         //set the request 'imgLink' to first value's image link that is returned from the api call
         req.imgLink = data.items[0].volumeInfo.imageLinks.thumbnail;
         next();
       }
    });
  };
  //===== MIDDLEWARE- Add a new book request to User's bookdRequests(req.sendToUserId)
  exports.pushBookRequest = function(req,res,next){
    //create a new book swap request
    var newBookSwapRequest = new BookRequest();

    newBookSwapRequest.to = req.body.sendTo;
    newBookSwapRequest.from = req.body.fromUser;
    newBookSwapRequest.requestedBook = req.body.title;
    newBookSwapRequest.swapFor = req.body.swapFor;
    newBookSwapRequest.approved = false;
    //is this request for the currently logged in User? (not an outstanding request from the logged in user) - here it is
    newBookSwapRequest.isUsersRequest = true;

    User.findOne({'_id': req.body.sendToUserId}, function(err,user){
      if(err){
         return res.send(err);
      }

      user.bookRequests.push(newBookSwapRequest);
      //save the user
      user.save(function(err){
        if(err){
          return res.send(err);
        }

        req.bookRequest = newBookSwapRequest;
        next();
      });//end save

    });//end find

  };
